const customCheckbox = document.querySelector('.custom-checkbox');
const nativeCheckbox = document.getElementById('native-checkbox');

function toggleCheckbox() {
    const currentState = customCheckbox.getAttribute('aria-checked') === 'true' || false;
    customCheckbox.setAttribute('aria-checked', !currentState);
    nativeCheckbox.checked = !nativeCheckbox.checked;
}

customCheckbox.addEventListener('click', toggleCheckbox);

customCheckbox.addEventListener('keydown', function (e) {
    const shouldToggle = ['Space', 'Enter'].includes(e.code)
    if (shouldToggle) {
      toggleCheckbox();
    }
});

nativeCheckbox.addEventListener('focus', function () {
    customCheckbox.classList.add('focus');
});

nativeCheckbox.addEventListener('blur', function () {
    customCheckbox.classList.remove('focus');
});

nativeCheckbox.addEventListener('change', function () {
    const isChecked = this.checked;
    customCheckbox.setAttribute('aria-checked', isChecked);
});
