class Responses {

  createFailResponse(msg, values) {
    return {
      success: false,
      message: msg,
      ...values
    }
  }

  createSuccessResponse(msg, values) {
    return {
      success: true,
      message: msg,
      ...values
    }
  }
}

module.exports = Responses;
