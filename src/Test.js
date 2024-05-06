import React, { Component } from 'react'
import Chart from 'react-apexcharts'


export class Test extends Component {


constructor(props) {
  super(props)

  this.state = {
     data:[
      {
        date: "2023-03-01",
        value: 10,
      },
      {
        date: "2023-03-02",
        value: 20,
      },
      {
        date: "2023-03-03",
        value: 30,
      },
      {
        date: "2023-03-04",
        value: 40,
      },
      {
        date: "2023-03-05",
        value: 50,
      },
      {
        date: "2023-03-06",
        value: 60,
      },
      {
        date: "2023-03-07",
        value: 70,
      },
      {
        date: "2023-03-08",
        value: 80,
      },
      {
        date: "2023-03-09",
        value: 90,
      },
      {
        date: "2023-03-10",
        value: 100,
      },
     ]
  }
}



  render() {
    return (
      <div>

      
<Chart
          options={
              {
                  plotOptions: {
                    radialBar: {
                      startAngle: -135,
                      endAngle: 225,
                      hollow: {
                        margin: 0,
                        size: "70%",
                        background: "#fff",
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: "front",
                        dropShadow: {
                          enabled: true,
                          top: 3,
                          left: 0,
                          blur: 4,
                          opacity: 0.24
                        }
                      },
                      track: {
                        background: "#fff",
                        strokeWidth: "80%",
                        margin: 0, // margin is in pixels
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.35
                        }
                      },
                
                      
                      dataLabels: {
                        showOn: "always",
                        name: {
                          offsetY: -20,
                          show: true,
                          color: "#888",
                          fontSize: "13px"
                        },
                        value: {
                          formatter: function (val) {
                            return val;
                          },
                          color: "#111",
                          fontSize: "30px",
                          show: true
                        }
                      }
                    }
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shade: "dark",
                      type: "horizontal",
                      shadeIntensity: 0.5,
                      gradientToColors: ["#ABE5A1"],
                      inverseColors: true,
                     
                      stops: [0, 100]
                    }
                  },
                  stroke: {
                    lineCap: "round"
                  },
                  labels: ["Progression %"]
                }
              }
              series={[]}
              type="radialBar"
              width="280"
            /> 


      </div>
    )
  }
}

export default Test



/*
xaxis: {
  type: "datetime",
  group: {
    type: "months",
    grouped: true,
  },
},
*/