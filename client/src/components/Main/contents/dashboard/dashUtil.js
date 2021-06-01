class dashUtils {

    //Dashboard 첫번째 영역에 나타낼 데이터를 Html 형태로 변환한다.
    firstZone(covidInfo) {
        if(covidInfo){
            const drop = (event) => {
                event.preventDefault();
                const data = event.dataTransfer.getData('text');
                event.target.appendChild(document.getElementById(data));
            }
            const dragover = (event) => {
                event.preventDefault();
            }
            const drag = (event) => {
                event.dataTransfer.setData('text',event.target.id)
            }
            let html = `<div class="boardRow">`;
            let i = 1;
            //필터링된 데이터를 활용하여 html을 생성
            for(const value of covidInfo){
                html += `<div class="board short-board-container" id="short${i}" draggable="true">`
                html += `<span>${value.title}</span>`;
                if(value.icon) html += '&nbsp&nbsp&nbsp'+value.icon;
                html += `<h2>${value.content}</h2>`;
                html += `<span style='color:#00ab71'>${value.foot}</span>`;
                html += '</div>'
                i++;
            }
            html += '</div>'
            return html;
        }
    }

    //Dashboard 두번째 영역에 나타낼 데이터를 Highchart 라이브러리를 활용하여 chart로 보여준다.
    secondZone(covidInfo) {
        const confirmed = new Array();
        const pieForm = {
            type: 'pie',
            name: '총 확진자 비율',
            data: [],
            center: [40, 20],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }
        //나라별 데이터 필터링
        covidInfo.forEach((info) => {
            const countryInfo = Array.from(info);
            const dataForm = {
                type: 'column',
                name: countryInfo[0].Country,
                data: [],
                color: countryInfo[0].Color
            }
            const confirmData = {
                name: countryInfo[0].Country,
                y: countryInfo[0].lastConfirm,
                color: countryInfo[0].Color,
                className: countryInfo[0].Country,
                events: {
                    // Pie 차트의 각 나라를 클릭할 경우 첫번째 Dashboard 영역의 데이터가 변경되도록 이벤트를 추가한다.
                    click: function (event) {
                        const today = document.querySelector("#short1").children[2];
                        const date = document.querySelector("#short1").children[3];
                        const total = document.querySelector("#short2").children[2];
                        const country = document.querySelector("#short2").children[3];
                        const recover = document.querySelector("#short3").children[2];
                        const deaths = document.querySelector("#short3").children[3];
                        today.innerText = this.options.custom.today + " 명";
                        date.innerText = "날짜: " + this.options.custom.date;
                        total.innerText = this.options.custom.total + " 명";
                        country.innerText = "국가: " + this.options.name;
                        recover.innerText = this.options.custom.recover + " 명";
                        deaths.innerText = "사망자수 :" + this.options.custom.deaths + " 명";
                    }
                },
                //가장 최근데이터를 custom data로 추가하여 관리한다.
                custom: {
                    recover: countryInfo[0].recover,
                    today: countryInfo[0].today,
                    date: countryInfo[0].date,
                    total: countryInfo[0].lastConfirm,
                    deaths: countryInfo[0].deaths
                }
            }
            pieForm.data.push(confirmData);

            //나라별 확진자 수 데이터를 객체에 추가한다.
            countryInfo.forEach((monthInfo) => {
                dataForm.data.push(monthInfo.Confirmed)
            })
            confirmed.push(dataForm);
        })
        confirmed.push(pieForm);

        //Highchart API를 활용하여 차트에 데이터를 넣어준다.
        Highcharts.chart('mainChart', {
            title: {
                text: '국가별 확진자 추이(명)'
            },
            xAxis: {
                categories: ['3월(2020)', '6월(2020)', '9월(2020)', '12월(2020)', '3월(2021)']
            },
            labels: {
                items: [{
                    html: ' ☜ Click! 국가별 총 확진자 비교(명)',
                    style: {
                        left: '130px',
                        top: '18px',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }]
            },
            series: confirmed
        });
    }
}


export default dashUtils;