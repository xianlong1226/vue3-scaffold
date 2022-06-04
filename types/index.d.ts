export { }
declare global {
  interface Window {
    zpWidget: any,
    zpStat: any,
    $user: any,
    $query: any
  }

  interface nodeApiResult {
    requestId: string,
    data: any,
    message: string,
    code: number,
    error: boolean,
  }

}
