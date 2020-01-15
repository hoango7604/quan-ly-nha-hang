const { app, cors } = require('./shared/share_modules');
const Routes = require('./routes/routes');

// Middleware
app.use(cors({ origin: '*' }));

// Routes
app.use('/nhanvien', Routes.NhanVienRoute);
app.use('/calamviec', Routes.CaLamViecRoute);
app.use('/menu', Routes.MenuRoute);
app.use('/banan', Routes.BanAnRoute);
app.use('/hoadon', Routes.HoaDonRoute);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server start on port ${PORT}`);
});

module.exports = app;