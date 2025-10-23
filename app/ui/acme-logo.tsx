import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '../ui/fonts';

export default function AcmeLogo() {
  return (
    <div className={`${lusitana.className} flex items-center gap-2 text-x2`}>
      <GlobeAltIcon className="h-6 w-6 text-blue-500" />
      <p className="font-bold">DVR</p>
    </div>
  );
}
