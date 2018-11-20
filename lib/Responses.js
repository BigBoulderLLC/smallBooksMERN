class Responses {

  createFailResponse(msg) {
      return {
        success: false,
        message: msg
      }
  }

  createSuccessResponse(msg) {
    return {
      success: true,
      message: msg
    }
  }
}

module.exports = Responses;
