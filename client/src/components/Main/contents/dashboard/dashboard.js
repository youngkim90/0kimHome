import React, {useEffect, useState}from 'react';
import Axios from 'axios';
import dashUtils from './dashUtil';

function dashboard(props) {

    useEffect( () => {
        window.scrollTo(0,0);
        const fetchEvents = async () => {
            //한국, 일본, 태국의 코로나 현황을 동기화 순으로 불러온다.
            const krRes = await Axios.get("https://api.covid19api.com/total/dayone/country/kr");
            const jpRes = await Axios.get("https://api.covid19api.com/total/dayone/country/jp");
            const thaiRes = await Axios.get("https://api.covid19api.com/total/dayone/country/Thailand");

            firstContents(krRes.data);  //대시보드 첫번째 영역에는 한국에 대한 정보를 보여준다.
            secondContents(krRes.data,jpRes.data,thaiRes.data); //대시보드 두번째 영역에는 세 나라의 비교 데이터를 보여준다.
        }

        fetchEvents();  //데이터 요청

        const dashUtil = new dashUtils; //dashboard util 호출

        // Dashboard 첫번째 영역에 보여줄 data를 필터링한다.
        const firstContents = (data) => {
            const todayConfirm = data[data.length-2].Confirmed - data[data.length-3].Confirmed;
            const today = "날짜: " + data[data.length-2].Date.split("T")[0];
            const firstTitle = "일일 코로나 확진자 수";
            const secondTitle = "총 확진자 수";
            const thirdTitle = "총 완치자 수";
            const firstIcon = "<i class='fas fa-ambulance' style='color:#04b504'></i>";
            const secondIcon = "<i class='fas fa-clinic-medical' style='color:#ff9563'></i>";
            const thirdIcon = "<i class='fas fa-smile' style='color:#f9df00'></i>";
            const firstContent = todayConfirm+" 명";
            const secondContent = data[data.length-2].Confirmed+" 명";
            const country = "국가: " + data[data.length-2].Country;
            const recover = data[data.length-2].Recovered +" 명";
            const death = "사망자 수: " + data[data.length-2].Deaths + " 명";

            //필터링 된 데이터를 배열에 담는다.
            const firstInfo = [];
            firstInfo.push(  {'title':firstTitle, 'content':firstContent, 'foot':today, 'icon':firstIcon},
                                {'title':secondTitle, 'content':secondContent, 'foot':country, 'icon':secondIcon},
                                {'title':thirdTitle, 'content':recover, 'foot':death, 'icon':thirdIcon}
                            );

            const content = dashUtil.firstZone(firstInfo);  //util을 활용하여 Data 배열을 html 형태로 변환한다.
            document.querySelector(".contentBoard").innerHTML = content;    //대시보드 첫번째 영역에 html 추가
        }

        // Dashboard 두번째 영역에 보여줄 data를 필터링한다.
        const secondContents = (krData, jpData, thaiData) => {
                //3개월 간격의 코로나 데이터를 호출
                const krMonthlyData = getMonthlyData(krData);
                const jpMonthlyData = getMonthlyData(jpData);
                const thaiMonthlyData = getMonthlyData(thaiData);
                krMonthlyData[0].Color = "#2196F3";
                jpMonthlyData[0].Color = "#f57c00";
                thaiMonthlyData[0].Color = "rgb(170, 102, 204)";

                //필터링된 데이터를 배열로 묶어준다.
                const totalData = [...[krMonthlyData], ...[jpMonthlyData], ...[thaiMonthlyData]];

                //html 요소를 생성한다.
                const mainChart = document.createElement("div");
                mainChart.setAttribute('id','mainChart');
                mainChart.setAttribute('class','board');
                document.querySelector(".contentBoard").appendChild(mainChart);

                dashUtil.secondZone(totalData); //Highchart 라이브러리를 활용하여 Dashboard 영역에 나타낸다.
        }

        //Dashboard 두번째 영역에 특정 월에 대한 데이터를 필터링한다.
        function getMonthlyData(data) {
            const allData = new Array();
            let i = 0;

            data.forEach((info) => {
                const today = info.Date.split("T")[0];
                // 3월15일 부터 3개월 간격으로 데이터를 추출한다.
                if(today && Number(today.substring(5,7))%3 === 0 && Number(today.substring(8,10)) === 15){
                    allData.push(info)
                }
                // 추가로 보내줄 가장 최근 데이터를 필터링한다.
                if(i === data.length-1){
                    allData[0].lastConfirm = info.Confirmed;
                    allData[0].recover = info.Recovered;
                    //한국은 이틀 전 내용이 최신 데이터이므로 이틀 전 데이터로 추출한다.
                    if(info.Country.indexOf("Korea") !== -1){
                        allData[0].date = data[data.length-2].Date;
                        allData[0].date = data[data.length-2].Date.split("T")[0];
                        allData[0].deaths = data[data.length-2].Deaths;
                        allData[0].today = data[data.length-2].Confirmed - data[data.length-3].Confirmed;
                    } else {
                        allData[0].date = info.Date.split("T")[0];
                        allData[0].deaths = info.Deaths;
                        allData[0].today = info.Confirmed - data[data.length - 2].Confirmed;
                    }
                }
                i++;
            })
            return allData;
        }
    },[])


    return (
        <>
        <div className="boardHead">
            <p>Dashboard</p>
        </div>
        <div className="contentBoard">
            <div id="mainChart">

            </div>
        </div>
        </>
    );
}

export default dashboard;