import React from 'react';

//메인화면의 Skill 영역에 대한 공통 내용
function SkillDetail(props) {
    const skillName = props.name + " skills_icon";
    const skillClass = "skills_bar " + props.skill;

    return (
        <>
        <div className="skills_data">
            <div className="skills_names">
                <i className={skillName}></i>
                <span className="skills_name">{props.title}</span>
            </div>
            <div className={skillClass}>
            </div>
            <div>
                <span className="skills_percentage">{props.per}</span>
            </div>
        </div>
        </>
    );
}

export default SkillDetail;