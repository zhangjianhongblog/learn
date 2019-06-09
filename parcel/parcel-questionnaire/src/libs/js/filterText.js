function filterText(value){
    if (!value) return '';
    return value.replace(/ /g,"&nbsp;")
        .replace(/>/g,"&gt;")
        .replace(/</g,"&lt;")
        .replace(/\n/g,"<br/>")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&apos;");
}
export default filterText;
