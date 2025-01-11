import React from "react";

function Otp() {
  const [otp, setOtp] = React.useState(Array(6).fill("1"));

  const handleOnChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  };
  return (
    <>
      <div className="flex gap-3 jusitfy-center my-5">
        {otp.map((item, index) => (
          <input
            key={index}
            type="text"
            className="w-[50px] h-[50px] text-center rounded-md"
            maxLength={1}
            onChange={(e) => {
              handleOnChange(e, index);
            }}
            value={item}
          />
        ))}
      </div>
      {newOtp.forEach((item, index) => {
        <h1 key={index}>{item}</h1>;
      })}
    </>
  );
}

export default Otp;
