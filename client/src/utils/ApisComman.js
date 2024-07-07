export const ApisComman = async (name, data, path, setError, method = 'POST', type, RecaptchaVal, recaptchaRef) => {
  // Check if Recaptcha is required and validate
  if (!type && !RecaptchaVal) {
    setError("Recaptcha required!");
    return;
  }
  

  const rcvdResp = await name({ path: path, data: data, method: method });


  if (rcvdResp.error?.error) {

    if (type === 'checkurl') {
      setError(false)
      return
    }



    setError(rcvdResp.error?.error);

  
    if (!type) {
      recaptchaRef.current.reset();
    }
  } else {
    return true;
  }

  setTimeout(() => {
    setError("");
  }, 3000);
  
};
