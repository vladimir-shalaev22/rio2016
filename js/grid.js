// Generated by CoffeeScript 1.9.3
(function() {
  var Grid, Line, Point, Random;

  Random = (function() {
    function Random() {}

    Random.integer = function(min, max) {
      return Math.floor(Math.random() * (1 + max - min)) + min;
    };

    Random.float = function(min, max) {
      return Math.random() * (max - min) + min;
    };

    Random.boolean = function() {
      if (Random.integer(0, 1) === 0) {
        return false;
      } else {
        return true;
      }
    };

    return Random;

  })();

  Point = (function() {
    var horizontal_variation, vertical_variation;

    horizontal_variation = 150;

    vertical_variation = 50;

    function Point(base1) {
      this.base = base1;
      this.offset = [Random.float(-horizontal_variation, horizontal_variation), Random.float(-vertical_variation, vertical_variation)];
    }

    return Point;

  })();

  Line = (function() {
    var generate_points;

    function Line(base1, size) {
      this.base = base1;
      this.size = size;
      this.points = generate_points(this.size);
    }

    generate_points = function(count) {
      var base, delta, i, j, points, ref;
      delta = 100.0 / count;
      points = [];
      base = 0;
      for (i = j = 1, ref = count; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
        points.push(new Point(base));
        base += delta;
      }
      return points;
    };

    return Line;

  })();

  Grid = (function() {
    var generate_distribution, generate_grid_lines, generate_lines_bases;

    function Grid() {
      var bases, distribution;
      distribution = generate_distribution();
      bases = generate_lines_bases();
      this.lines = generate_grid_lines(bases, distribution);
    }

    Grid.prototype.init_points_iterator = function() {
      this.current_line = 0;
      return this.current_point = 0;
    };

    Grid.prototype.get_next_position = function() {
      var line, point;
      line = this.lines[this.current_line];
      point = line.points[this.current_point++];
      if (this.current_point === line.points.length) {
        this.current_point = 0;
        this.current_line += 1;
        if (this.current_line === this.lines.length) {
          this.current_line = 0;
        }
      }
      return [line.base, point.base, point.offset];
    };

    Grid.prototype.get_grid_lines = function() {
      return this.lines;
    };

    generate_distribution = function() {
      var distribution, far_transition, first_losses, last_losses;
      first_losses = Random.integer(1, 3);
      last_losses = Random.integer(1, 3);
      far_transition = Random.boolean();
      distribution = [4, 4, 4, 4, 4];
      distribution[0] -= first_losses;
      distribution[4] -= last_losses;
      if (far_transition === true) {
        distribution[1] += last_losses;
        distribution[3] += first_losses;
      } else {
        distribution[1] += first_losses;
        distribution[3] += last_losses;
      }
      return distribution;
    };

    generate_lines_bases = function() {
      var amount, base, bases, i, j, k, len, ref, scale, w, weights;
      weights = [];
      amount = 0;
      bases = [];
      base = 0;
      for (i = j = 0; j <= 5; i = ++j) {
        amount += weights[i] = Random.float(3, 5);
      }
      scale = 100.0 / amount;
      ref = weights.slice(0, 5);
      for (k = 0, len = ref.length; k < len; k++) {
        w = ref[k];
        base += w * scale;
        bases.push(base);
      }
      return bases;
    };

    generate_grid_lines = function(bases, distribution) {
      var base, grid_lines, i, j, len;
      grid_lines = [];
      for (i = j = 0, len = bases.length; j < len; i = ++j) {
        base = bases[i];
        grid_lines.push(new Line(base, distribution[i]));
      }
      return grid_lines;
    };

    return Grid;

  })();

  this.PhrasesGrid = Grid;

}).call(this);