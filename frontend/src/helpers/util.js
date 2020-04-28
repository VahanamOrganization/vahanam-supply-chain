export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export const wait = async ms => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

/*
export function getUserDisplay(address, user) {
    return (
        <div className="userDisplay">
            <div className="displayName">
                {user.additionalData.displayName}
            <div className="tooltip">Ξ
                <span className="tooltipText">
                    {address}
                </span>
            </div>
        </div>
    );
}
*/
