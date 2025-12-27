class ApiResponse {
    constructor(statusCode,message,data=null){
        this.statusCode=statusCode;
        this.message=message;
        this.data=data;
        const success= statusCode>=200 && statusCode<300;
        this.success=success;
    }
}
export {ApiResponse}