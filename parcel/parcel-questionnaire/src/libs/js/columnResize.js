export function columnResize(selector,webUiInfoData){
    if(!this || !this.$el || typeof this.$el.querySelector!=="function")return;
    var box=this.$el.querySelector(selector);
    if(!box)return;
    var boxOffset=box.parentNode.getOffset();
    if(!boxOffset)return;
    var webUiInfo;
    if(webUiInfoData){
        webUiInfo=webUiInfoData;
    }else if(this.webUiInfo){
        webUiInfo=this.webUiInfo;
    }else{
        return;
    }
    var bottomMargin=webUiInfo.body.margin.bottom;
    var headerHeight=webUiInfo.header.height;
    var scrollTop=window.document.documentElement.scrollTop;
    var clientHeight=window.document.documentElement.clientHeight;
    var boxHeight=clientHeight + scrollTop - boxOffset.top-bottomMargin;
    if(boxHeight>clientHeight-headerHeight-bottomMargin*2){
        boxHeight=clientHeight-headerHeight-bottomMargin*2;
    }
    box.style.height=boxHeight+"px";
    scrollTop+=webUiInfo.header.height;
    if(scrollTop>boxOffset.top - bottomMargin){
        box.style.marginTop=scrollTop - boxOffset.top+bottomMargin+"px";
    }else{
        box.style.marginTop="0px";
    }
}
export function minHeight(selector,webUiInfoData){
    if(!this || !this.$el || typeof this.$el.querySelector!=="function")return;
    var box=this.$el.querySelector(selector);
    if(!box)return;
    var boxOffset=box.parentNode.getOffset();
    if(!boxOffset)return;
    var webUiInfo;
    if(webUiInfoData){
        webUiInfo=webUiInfoData;
    }else if(this.webUiInfo){
        webUiInfo=this.webUiInfo;
    }else{
        return;
    }
    var clientHeight=window.document.documentElement.clientHeight;
    var minHeight=clientHeight-box.getOffset().top-webUiInfo.body.margin.bottom;
    box.style.minHeight=minHeight+"px"
    return minHeight;
}
export default {resize:columnResize,minHeight:minHeight};
