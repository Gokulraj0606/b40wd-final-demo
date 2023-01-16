import Button from '@mui/material/Button';

export function Phone({ mobile }) {
    const roleId = localStorage.getItem("roleId")
    // const mobiles = {
    //   // model: "OnePlus 9 5G",
    //   // img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
    //   // company: "Oneplus"
    // }
    return (
        <div className='phone-container'>
            <img src={mobile.img} alt={mobile.model} className="phone-picture"></img>
            <h2 className='phone-name'>{mobile.model}</h2>
            <p className='phone-company'>{mobile.company}</p>
            {roleId === "0" ? (<Button sx={{ width: "100%" }} color={"error"} type='submit' variant="contained">
                Delete
            </Button>) : null}
        </div>
    );
}
