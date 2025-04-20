export const userRegisterConstraints = {
  username: {
    presence: true,
    length: {
        minimum: 3,
        maximum: 30,
        message: "Username requirements: At least 3 characters."
    }
  },
  password: {
    presence: true,
    length: {
        minimum: 8,
        maximum: 30
    },
    format: {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        message: "Password requirements: At least 8 characters, one uppercase letter, one lowercase letter, and one digit."
    }
  },
  securityQuestion: {
    presence: true
  },
  securityAnswer: {
    presence: true
  }
};

export const userRecoveryConstraints = {
  username: {
    presence: true
  },
  newPassword: {
    presence: true,
    length: {
        minimum: 8,
        maximum: 30
    },
    format: {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        message: "Password requirements: At least 8 characters, one uppercase letter, one lowercase letter, and one digit."
    }
  },
  securityAnswer: {
    presence: true
  }
};

export const userLoginConstraints = {
  username: {
    presence: true
  },
  password: {
    presence: true
  }
};

export const userAcceptConstraints = {
  id: {
    presence: true
  }
};

export const userDeleteConstraints = {
  id: {
    presence: true
  }
};

export const userSaveLocationConstraints = {
  cityName: {
    presence: true
  },
  date: {
    presence: true
  },
  countryCode: {
    presence: true
  }
};

export const historicalLocationConstraints = {
  location: {
    presence: true
  }
};

export const historicalDataConstraints = {
  location: {
    presence: true
  },
  date: {
    presence: true
  }
};