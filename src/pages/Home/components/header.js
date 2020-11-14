import React from 'react';
const HeaderTitle = ({icon, title}) => {
    return ( 
        <div className="header p-3">
                <a href="aaa.com" className="text-secondary text-decoration-none" >
                    <h6>
                        <i className={`${icon} px-1`} />
                        {title}
                    </h6>
                </a>
            </div>
     );
}
 
export default HeaderTitle;