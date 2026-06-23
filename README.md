# Birthday Website Final - Vợ iuuu

Bản này đã cá nhân hóa theo câu chuyện của hai người:
- Gọi là vợ iuuu
- Mốc chính thức yêu nhau: 27/11/2024
- Có phần những ngày đầu, Liên Quân, chờ tin nhắn, ngày yêu nhau
- Album polaroid / bàn kỷ niệm
- Video lời chúc
- Telegram báo khi bấm mở quà
- Đếm ngược 27 giây để bạn chuyển khoản tay
- Kết thúc cinematic + lời chúc riêng

File cần thay trong `assets`:
- photo1.jpg tới photo6.jpg
- my-photo.jpg
- music.mp3
- birthday-video.mp4
- video-poster.jpg

Muốn sửa nội dung chữ:
- Mở `index.html`, tìm các thẻ `<section class="scene memory-page...">`
- Sửa nội dung trong `<h2>` và `<p>`.

## Bản hybrid
- Các trang đầu giữ theo bản cũ.
- Sau Countdown 27s hiện lời chúc.
- Sau khoảng 6.5 giây tự chuyển sang trang dashboard romantic.
- Dashboard không hiện nút Telegram/hộp quà ở góc.

## Bản sửa UI/font
- Sửa font toàn bộ sang Be Vietnam Pro + Playfair Display, hỗ trợ tiếng Việt tốt hơn.
- Trang đầu đổi sang layout na ná dashboard tổng.
- Cân đối lại các card/cột ở dashboard cuối và responsive mobile.
- Chuẩn hóa chữ: kỷ niệm, lý do.

## Bản sửa nút/lý do
- Đã thêm đủ 27 lý do.
- Đã sửa các nút ở trang kết: Album, Hộp thư, 27 lý do, điều hướng.
- Thêm alias JS để tránh lỗi nếu còn onclick cũ.


## Ảnh đã nhét vào web
- assets/photo (1).webp
- assets/photo (1)_1.webp
- assets/photo (1)_2.webp
- assets/photo (10).webp
- assets/photo (11).webp
- assets/photo (12).webp
- assets/photo (13).webp
- assets/photo (14).webp
- assets/photo (2).webp
- assets/photo (2)_1.webp
- assets/photo (2)_2.webp
- assets/photo (3).webp
- assets/photo (4).webp
- assets/photo (5).webp
- assets/photo (6).webp
- assets/photo (7).webp
- assets/photo (8).webp
- assets/photo (9).webp

Đã rải ảnh ngẫu nhiên ở các trang và dùng toàn bộ ảnh trong album.


## Bản thêm mật khẩu
- Thêm trang nhập mật khẩu trước khi vào web.
- Câu hỏi: Ngày kỷ niệm của chúng mình là ngày nào?
- Mật khẩu: 2711
- Ảnh trang đầu được rải xuống dưới và mép ngoài để không che chữ/phong bì.


## Sửa photo (12)
- photo (12).webp chỉ dùng ở trang cuối sau countdown.
- Các vị trí khác thay bằng photo (11).webp.
- Ảnh ở khu happy birthday được đưa xuống layer dưới chữ.


## Mobile optimized
- Thêm giao diện riêng cho điện thoại.
- Trang đầu căn giữa, phong bì nhỏ lại, ảnh rải xuống dưới.
- Mỗi trang chỉ giữ 2 ảnh trang trí để không che chữ.
- Album chuyển layout 2 cột trên mobile.
- Countdown và ảnh cuối tối ưu cho màn hình dọc.
