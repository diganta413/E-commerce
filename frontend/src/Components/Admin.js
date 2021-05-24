import React from 'react'

function Admin() {
    return (
        <div style={{ margin: "auto" }}>
            <div style={{ backgroundColor: "#2874f0" }}>
                <h2 style={{ color: "white",fontWeight: "bolder",marginLeft: "40%",padding: "2%" }}>Admin Dashboard</h2>
                
            </div>
            <button style={{ padding: "1% 0",width: "20%",marginLeft: "41%",backgroundColor: "#f9f871",color: "black",fontSize: "30px",fontWeight: "bolder",outline: "none",borderRadius: "10px",marginTop: "20px" }}>Add new product</button>
        </div>
    )
}

export default Admin
