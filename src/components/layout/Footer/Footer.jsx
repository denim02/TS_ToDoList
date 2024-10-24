const Footer = () => {
  return (
    <footer className="border-t mt-auto bg-gray-50">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Deni Mastori. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
