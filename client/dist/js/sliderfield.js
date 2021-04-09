jQuery.entwine('ss', ($) => {
  $('input.slider').entwine({
    getMin() {
      return this.data('min');
    },
    getMax() {
      return this.data('max');
    },
    getStep() {
      return this.data('step');
    },
    getOrientation() {
      return this.data('orientation');
    },
    limitValue() {
      let val = parseFloat(this.val());
      if (isNaN(val)) val = 0;
      val = Math.max(this.getMin(), Math.min(this.getMax(), val));
      this.val(val);
      return val;
    },
    onmatch() {
      const _that = this;
      const val = _that.limitValue();
        // setup slider controller
      $("<div class='slide-controller'></div>")
        .insertAfter(this)
        .slider({
          orientation: _that.getOrientation(),
          range: 'min',
          value: val,
          min: _that.getMin(),
          max: _that.getMax(),
          step: _that.getStep(),
          slide: (event, ui) => {
            _that.val(ui.value);
			$(_that).trigger("change");
          }
        });
    },
    onchange() {
      this
        .siblings('.slide-controller')
        .slider('value', this.limitValue());
    }
  });
});