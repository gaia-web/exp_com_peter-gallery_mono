import { route, useRouter } from 'preact-router';
import { If } from '../utils/garage';

// export default function ReturnButtonView({ isShowing }: any) {

//   const goBack = () => {
//     if (window.history.length > 1) {
//       window.history.back();
//     } else {
//       route('/');
//     }
//   };

//   return (
//     <button
//       style={{ display: isShowing ? 'none' : 'block' }}
//       onClick={goBack}
//     >
//       back
//     </button>
//   )
// }


export default function ReturnButtonView(props: { en: string; zh: string }) {
  const { en, zh } = props;

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      route('/');
    }
  };

  const [router] = useRouter();
  const languageLabel = router.matches?.lang?.toUpperCase();

  const styleClass = "w-6rem text-center bg-#3F434D rounded-lg p-1rem";

  return (
    <If condition={languageLabel} onClick={goBack} style={{ cursor: 'pointer' }}>
      <div slot="EN" class={styleClass}  >
        {en}
      </div>
      <div slot="ZH" class={styleClass}>
        {zh}
      </div>
    </If>
  );
}

