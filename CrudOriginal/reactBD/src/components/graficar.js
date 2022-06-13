import React, { useLayoutEffect } from "react";
import functionPlot from "function-plot";






export default function Grafica({ H=10,K=2,a=3,b=5}) {
  useLayoutEffect(() => {
console.log("H: "+H+" K: "+K+" a: "+a+" b: "+b);
let width = 400;
let height = 400;
let maxX = Number(H) + Number(a);
let maxY = Number(K) + Number(b);
const root = document.querySelector("#plot");
let LimitArea =  Math.abs(maxX) >= Math.abs(maxY) ? Math.abs(maxX) : Math.abs(maxY);
console.log("LimitArea: "+LimitArea);
    functionPlot({
      target: root,
      width,
      height,
      yAxis: { domain: [-LimitArea, LimitArea] },
      xAxis: { domain: [-LimitArea, LimitArea] },
      grid: true,
      data: [
        {
          fn:
            "((x-" +
            H +
            ")*(x-" +
            H +
            "))/" +
            a * a +
            " + ((y-" +
            K +
            ") * (y-" +
            K +
            "))/" +
            b * b +
            " - 1",
          fnType: "implicit"
        }
      ]
    });
    
  }, []);
  
    return (
      <div id="plot"></div>
      
    )
  }
  