/**
 * METCH Solution - Online Academy
 * Interactive JavaScript for Bootstrap 5.3 Version
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_RAW_PHONE = '923006997639';
  const ACADEMY_NAME = 'METCH Solution';

  // Helper to build WhatsApp URL
  function getWhatsAppUrl(message) {
    return `https://wa.me/${WHATSAPP_RAW_PHONE}?text=${encodeURIComponent(message)}`;
  }

  // 1. Course Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseItems = document.querySelectorAll('.course-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => {
        b.classList.remove('btn-brand', 'active');
        b.classList.add('btn-light');
      });
      btn.classList.remove('btn-light');
      btn.classList.add('btn-brand', 'active');

      const selectedCategory = btn.getAttribute('data-category');

      // Filter cards
      courseItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (selectedCategory === 'all' || itemCat === selectedCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 2. Course Details Modal Populator
  const detailModalEl = document.getElementById('courseDetailModal');
  const detailModal = detailModalEl ? new bootstrap.Modal(detailModalEl) : null;
  const viewDetailButtons = document.querySelectorAll('.view-details-btn');

  viewDetailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title') || '';
      const duration = btn.getAttribute('data-duration') || '';
      const level = btn.getAttribute('data-level') || '';
      const desc = btn.getAttribute('data-desc') || '';
      const tools = btn.getAttribute('data-tools') || '';

      document.getElementById('modalCourseTitle').innerText = title;
      document.getElementById('modalDuration').innerText = duration;
      document.getElementById('modalLevel').innerText = level;
      document.getElementById('modalDesc').innerText = desc;
      document.getElementById('modalTools').innerText = tools;

      const inquiryText = `Assalam o Alaikum, I am interested in enrolling in the "${title}" course at ${ACADEMY_NAME}. Please share details regarding class timing, syllabus, and enrollment fees.`;
      const enrollLink = document.getElementById('modalEnrollWaLink');
      if (enrollLink) {
        enrollLink.href = getWhatsAppUrl(inquiryText);
      }

      if (detailModal) {
        detailModal.show();
      }
    });
  });

  // 3. Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('userName').value.trim();
      const phone = document.getElementById('userPhone').value.trim();
      const course = document.getElementById('courseChoice').value;
      const message = document.getElementById('userMsg').value.trim();

      if (!name || !phone) {
        alert('Please provide your name and phone number.');
        return;
      }

      const text = `Assalam o Alaikum, my name is ${name}. I am inquiring about the "${course}" course at ${ACADEMY_NAME}. Contact Number: ${phone}.${message ? ' Notes: ' + message : ''}`;
      window.open(getWhatsAppUrl(text), '_blank');
    });
  }

  // 4. Quick Enrollment Modal Form Submission
  const enrollModalForm = document.getElementById('enrollModalForm');
  const enrollModalEl = document.getElementById('enrollModal');
  if (enrollModalForm && enrollModalEl) {
    enrollModalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const course = document.getElementById('modalSelectCourse').value;
      const name = document.getElementById('modalStudentName').value.trim();
      const phone = document.getElementById('modalStudentPhone').value.trim();

      if (!name || !phone) {
        alert('Please fill out all required fields.');
        return;
      }

      const text = `Assalam o Alaikum, my name is ${name}. I want to register for the "${course}" course at ${ACADEMY_NAME}. My contact number is ${phone}. Please share registration details and fee structure.`;
      window.open(getWhatsAppUrl(text), '_blank');

      const modalInstance = bootstrap.Modal.getInstance(enrollModalEl);
      if (modalInstance) {
        modalInstance.hide();
      }
    });
  }

  // 5. Dismiss WhatsApp Floating Tooltip on click
  const waBubble = document.querySelector('.wa-bubble');
  if (waBubble) {
    waBubble.addEventListener('click', () => {
      const defaultMsg = 'Assalam o Alaikum, I want to get information about courses and enrollment at METCH Solution.';
      window.open(getWhatsAppUrl(defaultMsg), '_blank');
    });
  }
});
