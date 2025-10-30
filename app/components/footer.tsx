export default function Footer() {
  return (
    <footer className="bg-white py-12 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-white rounded-sm"></div>
          </div>
          <h2 className="text-3xl font-bold text-black">MAI Future</h2>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          {/* Left - Copyright */}
          <div className="text-left">
            © MAI Future 2024
          </div>

          {/* Center - Time */}
          <div className="text-center">
            Time → {new Date().toLocaleTimeString('en-GB', { 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit' 
            })}
          </div>

          {/* Right - Email */}
          <div className="text-right">
            contact@maifuture.com
          </div>
        </div>
      </div>
    </footer>
  );
}
