class SampleWebResource {
  public OnLoad(executionContext: Xrm.Events.LoadEventContextAsync) {
    const formContext = executionContext.getFormContext();
    const randomId = Math.random().toString(36);
    formContext.ui.setFormNotification("Hi form TypeScript!", "INFO", randomId);
  }
}

(window as any).SampleWebResource = new SampleWebResource();
