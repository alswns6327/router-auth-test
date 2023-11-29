const staticUsers = [
    {userid : "user1", password : "1234", roles:["users"]},
    {userid : "user2", password : "1234", roles:["users"]},
    {userid : "admin", password : "1234", roles:["users", "admins"]},
]

const pathsToRoles = [
    {path : "/", roles : ["everybody"]},
    {path : "/login", roles : ["everybody"]},
    {path : "/users", roles : ["users", "admins"]},
    {path : "/admins", roles : ["admins"]},
]

//userInfo가 null일 경우 로컬 스토리지 삭제
const setUserInfo = (userInfo) => {
    if(userInfo && userInfo.authenticated){
        window.localStorage.setItem("userInfo", btoa(JSON.stringify(userInfo)));
    }else{
        window.localStorage.removeItem("userInfo");
    }
}

const getUserInfo = () => {
    let strUserInfo = window.localStorage.getItem("userInfo");
    if(!strUserInfo){
        return {authenticated : false};
    }else{
        return JSON.parse(window.atob(strUserInfo));
    }
}

const loginProcess = (userid, password, successCallback, failCallback) => {
    // 이 부분은 백엔드 API 인증 서보와 HTTP 통신을 통하여 인증 처리해야 한다.
    const user = staticUsers.find(u => u.userid === userid && u.password === password);
    if(user){
        let userInfo = {authenticated : true, userid : user.userid, roles : user.roles}
        setUserInfo(userInfo);
        successCallback();
    }else{
        if(failCallback) failCallback();
    }
}

const logoutProcess = (callback) => {
    setUserInfo(null);
    callback();
}

// 경로와 사용자 정보의 role을 기반으로 접근 여부 결정(true/false)
const isMatchToRoles = (reqPath) => {
    // {path : "/", roles : ["everybody"]}
    const path = pathsToRoles.find(pr => pr.path === reqPath);
    // 경로 없을 경우 접근 불가
    if (!path) return false;

    const userInfo = getUserInfo();
    let isAcceessible = false;

    // everybody는 모두 접근 가능
    if(path.roles.find(p => p === "everybody")){
        isAcceessible = true;
    }else if(userInfo.authenticated){ //권한 체크
        for(let uRole of userInfo.roles){
            if(path.roles.indexOf(uRole) > -1){ // 해당 uri에 매칭되는 권한 있는 경우
                isAcceessible = true;
                break;
            }
        }
    }
    return isAcceessible;
}

export {isMatchToRoles, loginProcess, logoutProcess, getUserInfo};
