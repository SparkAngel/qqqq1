import React, { useState, useEffect } from 'react';

const Button = ({ disabledButton, handleStartGame }) => (
  <>
  <button
    type="submit"
    className="btn btn-primary btn-sm"
    disabled={disabledButton}
    onClick={handleStartGame}
  >
        START
  </button>
  </>
);

export default Button;
