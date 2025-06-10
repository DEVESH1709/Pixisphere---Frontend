import { FormEvent, useState } from 'react';

interface InquiryModalProps {
  onClose: () => void;
  photographerName: string;
}

export default function InquiryModal({ onClose, photographerName }: InquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`Inquiry sent!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-md p-6 rounded-lg bg-amber-200">
        <h2 className="text-2xl font-bold mb-4 text-amber-950" >Inquiry to {photographerName}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="font-semibold text-black">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border-4 text-black rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border-4 text-black rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold text-black">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required 
              className="w-full p-2 border-4 rounded text-black mt-1"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 border rounded hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
