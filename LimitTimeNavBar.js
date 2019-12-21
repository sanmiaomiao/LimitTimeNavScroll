
	
	/*  <div class="divide-bar">
	   /* <div @click="select('before')" v-if="false">
	      <i class="bar-up icon-chevron-up"></i>
	    </div> 
	    <div class="divide-bar-stage" id="divide-bar-stage"
	         :style="{ width: stageWidth + 'px' }" @click="handleEvent" @touchstart="handleEvent"
	         @touchmove="handleEvent" @touchend="handleEvent">
	      <div class="divide-bar-container" :class="{ easein: !isTouch }"
	           :style="{ width: itemWidth + 'px', transform: `translateX(${realTranslate}px )` }">
	<!--由于container包含了所有的item 让container移动可以使item整体实现移动
	初始状态第一个div的中心轴线为原点
	注意：鼠标移动方向正好和item移动方向相反，所有鼠标正向移动(clientX增大)时，item 整体反向移动(realTranslate<0)
	-->
	        <div class="divide-bar-item"
	             :style="{ /*transform: `translateX(${translateRate * index}px)`...
	              width: itemWidth + 'px'}"    style="color: white"
	             :class="{'active' : item === map, 'first-child': index === 0 }" v-for="(item, index) in maps" :key="index"
	             @click="select(index)">
	          <div v-show="item.dateDesc==='昨日'" class="divide">
	            <div class="date" v-show="index===0">昨日</div>
	            <div style="width: 76px;height: 52px;padding-top: 10px;
	             background-image: url(https://s10.mogucdn.com/mlcdn/c45406/191210_59a75f4457jhief7681a6c82l3c47_750x110.jpg)">
	              <p style="font-weight: bold;">{{item.timeDesc}}</p>
	              <p style="font-size: 12px;margin-top: 5px">{{item.statusDesc}}</p>
	            </div>
	          </div>
	        <div v-show="item.dateDesc==='今日'" class="divide">
	          <div class="date" v-show="index===2">今日</div>
	          <div style="width: 76px;height: 52px;padding-top: 10px;
	             background-image: url(https://s10.mogucdn.com/mlcdn/c45406/191210_59a75f4457jhief7681a6c82l3c47_750x110.jpg)">
	            <p style="font-weight: bold;">{{item.timeDesc}}</p>
	            <p style="font-size: 12px;margin-top: 5px">{{item.statusDesc}}</p>
	          </div>
	        </div>
	      <div v-show="item.dateDesc==='明日'" class="divide">
	        <div class="date" v-show="index===9">明日</div>
	        <div style="width: 76px;height: 52px;padding-top: 10px;
	             background-image: url(https://s10.mogucdn.com/mlcdn/c45406/191210_59a75f4457jhief7681a6c82l3c47_750x110.jpg)">
	          <p style="font-weight: bold;">{{item.timeDesc}}</p>
	          <p style="font-size: 12px;margin-top: 5px">{{item.statusDesc}}</p>
	        </div>
	      </div>
	    </div>
	
	      </div>
	
	    <div @click="select('next')" v-if="false">
	      <i class="bar-down icon-chevron-down"></i>
	    </div>
	  </div>
	  </div> */
	  
	  
	  
	  !function(t,e){
		  "object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("LimitTimeNavBar",[],e):t.LimitTimeNavBar=e()
	  }(this,function(){
		  'use strict' //严格模式 ES5提出
		  //模块代码的公用工具类
		  function isObj(obj){
		  	return typeof obj==='object' && obj!==null
		  }
		  function isArray(arr){
		  	return arr.constructor===Array;
		  }
		  
		  function handleEvent(e) {
						var e=e||event;
		             //    console.log("clientX:"+e.touches[0].clientX);
					 var basedatas=e.basedatas;
		                  if (e.type === 'touchstart') {
		                      basedatas.touchStart = e.touches[0].clientX;//clientY: 251
		                      basedatas.moveDistance = 0;
		                      basedatas.lastTranslate = basedatas.realTranslate;// realRotate: 0,//实际旋转度数
		                      basedatas.isTouch = true;
		                  }
		                  if (e.type === 'touchmove') {
		                      e.preventDefault();
		                      basedatas.moveDistance = basedatas.touchStart - e.touches[0].clientX;//鼠标和item反向移动
		                      basedatas.eachOffset = basedatas.moveDistance;//偏转位移
		                      basedatas.realTranslate = basedatas.lastTranslate + basedatas.eachOffset;//修改真实位移
		                  }
		                //  console.log('realTranslate')
		                 // console.log(this.realTranslate)
		                  //下面判断的作用为限制偏转范围
		                      if (basedatas.realTranslate > basedatas.translateRate / 2) {//真实角度大于10度，则偏转角度=10度
		                          basedatas.realTranslate = basedatas.translateRate / 2;
		                      }
		  
		                      if (basedatas.realTranslate < -basedatas.translateRate * (basedatas.maps.length - 1) - basedatas.translateRate / 2) {//真实角度小于-70度
		                          basedatas.realTranslate = -basedatas.translateRate * (basedatas.maps.length - 1) - basedatas.translateRate / 2;
		                      }
		               //   console.log(this.realTranslate)
		  
		                      if (e.type === 'touchend') {
		                          var r = basedatas.realTranslate % basedatas.translateRate;//等分剩余位移
		                          var c = basedatas.realTranslate / basedatas.translateRate;//等分数（小数）
		                          c = parseInt(c);//等分数取整
		                          var index;
		                          if (basedatas.realTranslate >= 0) {//向左偏转
		                              if (r > basedatas.translateRate / 2) {
		                                  basedatas.realTranslate = basedatas.realTranslate + basedatas.translateRate - r;//去掉余数后加一，自动补一格
		                                  c++;
		                              } else {//真实角度被20度等分后余角小于或等于一半
		                                  basedatas.realTranslate = basedatas.realTranslate - r;//直接去掉余数
		                              }
		                              //console.log(basedatas.realTranslate)
		                              index = c;
		                          } else {//向右偏转
		                              if (r + basedatas.translateRate / 2 < 0) {//偏转大于10度
		                                  basedatas.realTranslate = basedatas.realTranslate - basedatas.translateRate - r;//滑动超过一半
		                                  c--;
		                              } else {
		                                  basedatas.realTranslate = basedatas.realTranslate - r;
		                              }
		                              //console.log(basedatas.realTranslate)
		                              index = Math.abs(c);
		                          }
		                          //basedatas.$emit('update:map', basedatas.maps[index]);
								  basedatas.map=basedatas.maps[index];
		                          basedatas.isTouch = false;
		                      }
							  return basedatas;
		                  }
						  //创建昨日、今日、明日div
						  function yesterday (divide) {
								var date=document.createElement('div');// <div class="date" v-show="index===0">昨日</div>
						  		date.className="date";
						  		date.innerHTML='昨日';
						  		divide.appendChild(date);
						  }
						  function today (divide) {
						  		var date=document.createElement('div');// <div class="date" v-show="index===0">昨日</div>
						  		date.className="date";
						  		date.innerHTML='今日';
						  		divide.appendChild(date);
						  }
						  function tomorrow (divide) {
						  		var date=document.createElement('div');// <div class="date" v-show="index===0">昨日</div>
						  		date.className="date";
						  		date.innerHTML='明日';
						  		divide.appendChild(date);
						  }
		  
		  
		  return function (obj) {
		  	
		  	if(!isObj(obj)|| isArray(obj)){
		  		//console.log('数据类型错误')
		  		throw new Error('数据类型错误')
		  	}
					var el=obj.el;	
					var maps =obj.data;
					var map = maps[6];
					var callback=obj.callback;
					var basedatas={
										stageWidth: 360,//滚动宽度
						                itemWidth: 76,//每个div宽度
						                translateRate: 76,//每次偏转位移
						                itemNum: 18,//单圈最大容纳数目
						                realTranslate: -456,//实际偏转位移
						                lastTranslate: 0,
						                eachOffset: 0,
						                touchStart: 0,
						                moveDistance: 0,
						                isTouch: false,
										maps:maps,
										map:map,
					}
				
				
				var BarParentNode=document.querySelector(el)  //列表父级节点
				var timeBar=document.createElement('div');//<div class="time_bar">
				timeBar.className='time_bar';
				BarParentNode.appendChild(timeBar);
				var navWrap=document.createElement('div');// <div class="nav-wrap">
				navWrap.className='nav-wrap';
				timeBar.appendChild(navWrap);
				var navActiveMask=document.createElement('div');// <div  id='nav-active-mask' class="nav-active-mask" style="background: rgb(255, 203, 221)"></div>
				navActiveMask.className='nav-active-mask';
				navActiveMask.id='nav-active-mask';
				navActiveMask.style.cssText="background: rgb(255, 203, 221)";
				navWrap.appendChild(navActiveMask);
				
				var divideBar=document.createElement('div');//  <div class="divide-bar">				
				divideBar.className='divide-bar';
				navWrap.appendChild(divideBar);
				
				var divideBarStage=document.createElement('div');// <div class="divide-bar-stage" id="divide-bar-stage"
				//<div class="divide-bar-stage" id="divide-bar-stage"       :style="{ width: stageWidth + 'px' }"
				divideBarStage.className="divide-bar-stage";
				divideBarStage.id="divide-bar-stage";
				divideBarStage.style.width=basedatas.stageWidth + 'px';//
				divideBarStage.onclick=function(e){
					//console.log('click')					
					e.basedatas=basedatas;
					//console.log(e.basedatas)
					basedatas=handleEvent(e);
					updataBasedatas();
				};//@click="handleEvent" @touchstart="handleEvent"  @touchmove="handleEvent" @touchend="handleEvent"
				divideBarStage.ontouchstart=function(e){
					//console.log('touchstart')
					e.basedatas=basedatas;
					//console.log(e.basedatas)
					basedatas=handleEvent(e);
					updataBasedatas();
				};
				divideBarStage.ontouchmove=function(e){
					//console.log('touchmove')
					e.basedatas=basedatas;
					//console.log(e.basedatas)
					basedatas=handleEvent(e);
					updataBasedatas();
				};
				divideBarStage.ontouchend=function(e){
					//console.log('touchend')
					e.basedatas=basedatas;
					//console.log(e.basedatas)
					basedatas=handleEvent(e);
					updataBasedatas();
				};
				divideBar.appendChild(divideBarStage);
				
				var divideBarContainer=document.createElement('div');// <div class="divide-bar-container" 
				// <div class="divide-bar-container" :class="{ easein: !isTouch }"   :style="{ width: itemWidth + 'px', transform: `translateX(${realTranslate}px )` }">
				//divideBarContainer.className="divide-bar-container";
				!basedatas.isTouch?divideBarContainer.className="divide-bar-container easein":divideBarContainer.className="divide-bar-container";//
				divideBarContainer.style.width=basedatas.itemWidth + 'px';//
				//console.log(divideBarContainer.style.width)
				divideBarContainer.style.transform="translateX("+basedatas.realTranslate+"px)"; //
				divideBarStage.appendChild(divideBarContainer);
				//console.log(divideBarContainer.style.transform)
				//遍历
				maps.forEach((item,index)=>{
				var divideBarItem=document.createElement('div');// <div class="divide-bar-item"			
				 item === map?divideBarItem.className="divide-bar-item active":divideBarItem.className="divide-bar-item";
				divideBarItem.style.width=basedatas.itemWidth + 'px';//
				divideBarItem.style.color='white';
				divideBarContainer.appendChild(divideBarItem);				
				var divide=document.createElement('div');//<div v-show="item.dateDesc==='昨日'" class="divide">
				divide.className=="divide";
				divide.style.display='flex';
				divide.style.alignItems='center';
				divideBarItem.appendChild(divide);
				/* <div v-show="item.dateDesc==='今日'" class="divide">
				  <div class="date" v-show="index===2">今日</div>
				  <div style="width: 76px;height: 52px;padding-top: 10px;
				     background-image: url(https://s10.mogucdn.com/mlcdn/c45406/191210_59a75f4457jhief7681a6c82l3c47_750x110.jpg)">
				    <p style="font-weight: bold;">{{item.timeDesc}}</p>
				    <p style="font-size: 12px;margin-top: 5px">{{item.statusDesc}}</p>
				  </div>
				</div> */
				
				index===0?yesterday(divide):index===2?today(divide):index===9?tomorrow(divide):null;				
				var dividecontent=document.createElement('div');// <div style="width: 76px;height: 52px;padding-top: 10px;
				/* <div style="width: 76px;height: 52px;padding-top: 10px;
				 background-image: url(https://s10.mogucdn.com/mlcdn/c45406/191210_59a75f4457jhief7681a6c82l3c47_750x110.jpg)"> */
				 dividecontent.style.width="76px";
				  dividecontent.style.height="52px";
				   //dividecontent.style.paddingTop="10px"
				 dividecontent.style.backgroundImage="url(https://s10.mogucdn.com/mlcdn/c45406/191210_59a75f4457jhief7681a6c82l3c47_750x110.jpg)"
								 
				divide.appendChild(dividecontent);
				var divideTimeDesc=document.createElement('div');// <p style="font-weight: bold;">{{item.timeDesc}}</p>
				divideTimeDesc.innerHTML=item.timeDesc;
				divideTimeDesc.style.fontWeight="bold";
				dividecontent.appendChild(divideTimeDesc);
				var divideStatusDesc=document.createElement('div');// <p style="font-weight: bold;">{{item.timeDesc}}</p>
				divideStatusDesc.innerHTML=item.statusDesc;
				divideStatusDesc.style.fontWeight="bold";
				divideStatusDesc.style.fontSize='12px';
				divideStatusDesc.style.paddingTop='5px';
				dividecontent.appendChild(divideStatusDesc);					
				})
				callback(basedatas.map);
				//更新basedatas数据的函数
				function updataBasedatas(){
					divideBarStage.style.width=basedatas.stageWidth + 'px';
					divideBarContainer.style.width=basedatas.itemWidth + 'px';
					divideBarContainer.style.transform="translateX("+basedatas.realTranslate+"px)"; 
					//divideBarItem.style.width=basedatas.itemWidth + 'px';
					!basedatas.isTouch?divideBarContainer.className="divide-bar-container easein":divideBarContainer.className="divide-bar-container";
					//console.log('map')
					//console.log(basedatas.map)
					callback(basedatas.map)
				}
				
		  }
	  })