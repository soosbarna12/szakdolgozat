const userRegisterConstraints = {
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

const userRecoveryConstraints = {
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

const userLoginConstraints = {
  username: {
    presence: true
  },
  password: {
    presence: true
  }
};

const userAcceptConstraints = {
  id: {
    presence: true
  }
};

const userDeleteConstraints = {
  id: {
    presence: true
  }
};

const userSaveLocationConstraints = {
  historicalPageData: {
    presence: true
  }
};

const userDeleteLocationConstraints = {
  userLocationID: {
    presence: true
  }
};

const historicalLocationConstraints = {
  location: {
    presence: true
  }
};

const historicalDataConstraints = {
  location: {
    presence: true
  },
  date: {
    presence: true
  }
};

const pastHistoricalDataConstraints = {
  location: {
    presence: true
  },
};

module.exports = {
  userRegisterConstraints,
  userRecoveryConstraints,
  userLoginConstraints,
  userAcceptConstraints,
  userDeleteConstraints,
  userSaveLocationConstraints,
  userDeleteLocationConstraints,
  historicalLocationConstraints,
  historicalDataConstraints,
  pastHistoricalDataConstraints,
};