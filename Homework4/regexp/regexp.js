window.onload = function () {
    const str = document.getElementById("text").innerHTML;
    console.log(str);
    const regexp = /^'|(\s)'|'(\s)|'$/gi;
    console.log(str.match(regexp));
    console.log(str.replace(regexp, '"'));
}
