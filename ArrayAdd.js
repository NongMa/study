//数组拓展方法
Array.prototype.random=function(){
    var that=this;
    for(var i=0;i<that.length;i++){
	    var newIndex=Math.floor(Math.random()*that.length);
	    var itemIndex=that[newIndex]
	    that[newIndex]=that[i];
	    that[i]=itemIndex;
    }
    return that;
}