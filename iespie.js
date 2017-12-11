/**
*使用方法
*   iespie('targetDom', {options})
*       targetDom: 整个控件的总容器,'#box'
*       options: 参数配置,
*       {
*           innerDataset: [40,40,40],   //inner层数据(扇形个数,数值一样则为等分)
*           innerColor: ['cyan'],   //inner层颜色(扇形颜色,可设置一个则颜色相同,也可设置颜色个数与数据个数相同)
*           midDataset: [30,30],    //mid层数据
*           midColor: ["#FFA500", "#FEFE00"],   //mid层颜色
*           outerNum: 4,    //outer层个数(取值1~4)
*           outerColor: ['#03b47a'],    //oute层颜色
*       }
*/
(function(window, document) {
    var iespie = function(targetDom = 'body', options = {}) {
        // 获取容器宽高
        var box_width = document.querySelector(targetDom).offsetWidth;
        var box_height = document.querySelector(targetDom).offsetHeight;
        
        // 一个函数，将数组元素(数字)转化为可以绘制扇形的数据---pie([20,13,50])
        var pie = d3.layout.pie();
        // 添加svg并设置相应属性
        var svg = d3.select(targetDom).append("svg")
            .attr("width", box_width)
            .attr("height", box_height)
            // .style("background-color", "gray")
        // 容器平移距离
        var translateXY = box_width / 2;
        //-----------innerPieStart-----------
        var innerColor = options.innerColor || ['cyan'];
        var innerDataset = options.innerDataset || [40,40,40];
        // inner容器
        var inner_box = svg.append("g")
            .attr("class", "inner_box")
        // 创建弧度生成器
        var innerArc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(box_width * 0.2);
        // 向inner容器中添加相应数据并平移
        var innerArcs = inner_box.selectAll("g")
            .data(pie(innerDataset))
            .enter()
            .append("g")
            .attr("transform", "translate(" + translateXY + "," + translateXY + ")")
        // 添加路径并绘制以及设置相应属性
        innerArcs.append("path")
            .attr("fill", function(d, i) {
                if (innerColor.length == 1) {
                    return innerColor[0];
                } else {
                    return innerColor[i];
                }
            })
            .attr("d", function(d) {
                return innerArc(d);
            })
            .attr("stroke", "#444")
            .attr("stroke-width", "2")
        // 添加文字
        // innerArcs.append("text")  
        //     .attr("transform",function(d){  
        //         return "translate(" + innerArc.centroid(d) + ")";  
        //     })
        //     .attr("text-anchor","middle")
        //     .style('font-size', '10px')
        //     .text(function(d, i){
        //         console.log(d)
        //         return i;  
        //     })
        //-----------innerPieEnd-----------
        //-----------midPieStart-----------
        var midColor = options.midColor || ["#FFA500", "#FEFE00"];
        var midDataset = options.midDataset || [30,30];

        var mid_box = svg.append("g")
            .attr("class", "mid_box")

        var midArc = d3.svg.arc()
            .innerRadius(box_width * 0.2)
            .outerRadius(box_width * 0.3)

        var midArcs = mid_box.selectAll("g")
            .data(pie(midDataset))
            .enter()
            .append("g")
            .attr("transform", "translate(" + translateXY + "," + translateXY + ")")

        midArcs.append("path")
            .attr("fill", function(d, i) {
                if (midColor.length == 1) {
                    return midColor[0];
                } else {
                    return midColor[i];
                }
            })
            .attr("d", function(d) {
                return midArc(d);
            })
            .attr("stroke", "#444")
            .attr("stroke-width", "1")
        //-----------midPieEnd-----------
        //-----------outerPieStart-------
        var outerColor = options.outerColor || ['#03b47a'];
        var endAngle = 2 * Math.PI
        var originalData = [
            { startAngle: 0.25 * endAngle, endAngle: 0.375 * endAngle },
            { startAngle: 0.375 * endAngle, endAngle: 0.5 * endAngle },
            { startAngle: 0.5 * endAngle, endAngle: 0.625 * endAngle },
            { startAngle: 0.625 * endAngle, endAngle: 0.75 * endAngle },
        ];
        var data = [];
        var outerNum = options.outerNum || 4;

        if (outerNum == 1) {
            for (let i = 0; i < outerNum; i++) {
                data.push(originalData[i])
            }
        } else if (outerNum == 2) {
            for (let i = 0; i < options.outerNum; i++) {
                data.push(originalData[i])
            }
        } else if (outerNum == 3) {
            for (let i = 0; i < outerNum; i++) {
                data.push(originalData[i])
            }
        } else if (outerNum == 4) {
            for (let i = 0; i < outerNum; i++) {
                data.push(originalData[i])
            }
        }

        var outer_box = svg.append("g")
            .attr("class", "outer_box")

        var outerArc = d3.svg.arc()
            .innerRadius(box_width * 0.3)
            .outerRadius(box_width * 0.49)

        var outerArcs = outer_box.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", "translate(" + translateXY + "," + translateXY + ")")

        outerArcs.append("path")
            .attr("fill", function(d, i) {
            	if (outerColor.length == 1) {
                    return outerColor[0];
                } else {
                    return outerColor[i];
                }
            })
            .attr("d", function(d) {
                return outerArc(d);
            })
            .attr("stroke", "#444")
            .attr("stroke-width", "2")
        //-----------outerPieEnd-------
    };
    window.iespie = iespie;
}(window, document));