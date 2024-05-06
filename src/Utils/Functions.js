function OnlyInputNumber(e) {
    var result = "";
    const re = /^[0-9\b]+$/;
    // if value is not blank, then test the regex
    if (e === "" || re.test(e)) {
      result = e;
    }
    return result;
  }
  

  export {OnlyInputNumber}