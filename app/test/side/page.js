function SomeComponent() {
  const { toggle, open, close } = useSidebar();

  return (
    <div>
      <Button onClick={toggle}>Toggle Sidebar</Button>
      <Button onClick={open}>Open Sidebar</Button>
      <Button onClick={close}>Close Sidebar</Button>
    </div>
  );
}