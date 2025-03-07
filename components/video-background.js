export default function VideoBackground() {
    return (
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-screen h-screen object-cover z-[-1]"
      >
        <source src="/videos/bg2Perro.mp4" type="video/mp4" />
      </video>
    );
  }
  