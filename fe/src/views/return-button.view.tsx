import { route } from 'preact-router';

export default function ReturnButtonView({ isShowing }: any) {

  const goBack = () => {
    console.log(window.history.length)
    if (window.history.length > 1) {
      window.history.back();
    } else {
      route('/');
    }
  };

  return (
    <button
      style={{ display: isShowing ? 'none' : 'block' }}
      onClick={goBack}
    >
      {console.log(isShowing)}
      back
    </button>
  )
}

