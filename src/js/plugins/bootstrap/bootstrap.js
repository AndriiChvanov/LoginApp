import "jquery/dist/jquery";
import "popper.js/dist/popper.js";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-4-autocomplete/dist/bootstrap-4-autocomplete";
import "bootstrap-datepicker/dist/js/bootstrap-datepicker";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.css";

//autocomplete
export function getAutocomplete(
    id,
    src = {
        Default: 1,
    }
) {
    $(`#${id}`).autocomplete({
        source: src,
        onSelectItem: onSelectItem,
        treshold: 1,
        maximumItems: 10,
        highlightClass: "text-danger",
    });
}

function onSelectItem(item, element) {
    element.setAttribute("value", item.label);
    element.dataset.index = item.value;
}

//datepicker
export function getDatePicker() {
    $(".datepicker").datepicker({
        format: "dd.mm.yyyy",
        autoclose: true,
        todayHighlight: true,
        keyboardNavigation: true,
    });
}
