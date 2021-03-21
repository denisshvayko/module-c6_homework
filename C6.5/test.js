function get_screen_parametrs(){
    y_parametr = window.screen.width;
    x_parametr = window.screen.height;
    window.alert(`Ширина твоего экрана: ${x_parametr}\r\nВысота твоего экрана: ${y_parametr}`);
}

const btnStart = document.querySelector('.js_button');
btnStart.addEventListener('click', get_screen_parametrs);
