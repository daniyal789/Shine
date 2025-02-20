<!-- <template>
  <footer class="bg-[#D9B99B]  text-black p-4 text-center">
    <ul class="flex p-5 justify-center space-x-4 text-center" >
      <li><a href="" class="pi pi-facebook"></a></li>
      <li><a href="" target="blank" class="pi pi-instagram"></a></li>
      <li><a href="/" class="pi pi-whatsapp"></a></li>
      <li><a href="/" class="pi pi-twitter"></a></li>
    </ul>

    <ul class="flex flex-wrap p-5 justify-center space-x-4 text-center md:flex-nowrap">
      <li><a href="/">Contact</a></li>
      <li><a href="/">FAQs</a></li>
      <li><a href="/">Privacy</a></li>
      <li><a href="/">Terms</a></li>
      <li><a href="/">Jobs</a></li>
      <li><a href="/">Reviews</a></li>
      <li><a href="/">Deals</a></li>
    </ul>
    <span>&copy; {{new Date().getFullYear()}} AlphaDroid. All Rights Reserved</span>
  </footer>
</template>

<script>



</script> -->

<template>
  
  <footer class=" text-white p-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Logo and Copyright Section -->
      <div>
        <a href="/" class="text-2xl font-bold">
          <img src="assets/iogo.png" alt="Logo" class="h-12" />
        </a>
      </div>

      <!-- Legal Links Section -->
      <div>
        <h3 class="text-lg font-medium mb-2">Legal</h3>
        <ul>
          <li><a href="/terms" class="hover:underline">Terms & Conditions</a></li>
          <li><a href="/privacy" class="hover:underline">Privacy Policy</a></li>
          <li><a href="/cookie" class="hover:underline">Cookie Policy</a></li>
          <li><a href="/disclaimer" class="hover:underline">Disclaimer Policy</a></li>
        </ul>
      </div>

      <!-- Navigation Links Section -->
      <div>
        <h3 class="text-lg font-medium mb-2">Links</h3>
        <ul>
          <li><a href="/about" class="hover:underline">About</a></li>
          <li><a href="/offerings" class="hover:underline">Offerings</a></li>
          <li><a href="/pricing" class="hover:underline">Pricing</a></li>
          <li><a href="/partnership" class="hover:underline">Partnership</a></li>
          <li><a href="/contact" class="hover:underline">Contact Us</a></li>
        </ul>
      </div>

      <!-- Office Locations Section -->
      <div>
        <h3 class="text-lg font-medium mb-2">Offices</h3>
        <p class="mb-2">
          <span class="font-semibold">UK</span><br />
          6th Floor, 2 Lakeside Drive, First Central 200, London, NW10 7FQ<br />
          +44 7774633113<br />
          hello@alphadroid.io
        </p>
        <p>
          <span class="font-semibold">India</span><br />
          1202, Tower-C, ATS Bouquet, Sector 132, Noida, Uttar Pradesh, 201304<br />
          +91 7217886671<br />
          hello@alphadroid.io
        </p>
      </div>
    </div>

    <!-- Social Media Links with Icons -->
    <div class="flex justify-center space-x-6 mt-8">
      <!-- Facebook Icon -->
      <a href="https://facebook.com" target="_blank" aria-label="Facebook" class="hover:text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
          <path d="M22.675 0h-21.35C.597 0 0 .598 0 1.326v21.348C0 23.404.597 24 1.325 24h11.494v-9.294H9.577v-3.622h3.242V8.408c0-3.212 1.946-4.965 4.787-4.965 1.361 0 2.531.101 2.872.146v3.33h-1.973c-1.553 0-1.854.739-1.854 1.82v2.387h3.705l-.482 3.622h-3.223V24h6.318c.729 0 1.326-.596 1.326-1.326V1.326C24 .598 23.404 0 22.675 0z" />
        </svg>
      </a>

      <!-- Instagram Icon -->
      <a href="https://instagram.com" target="_blank" aria-label="Instagram" class="hover:text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm8.5 1.5h-8.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm-4.25 4.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25-.76a1.01 1.01 0 1 1 2.02 0 1.01 1.01 0 0 1-2.02 0z" />
</svg>

      </a>

      <!-- LinkedIn Icon -->
      <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn" class="hover:text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
          <path d="M22.23 0H1.77C.79 0 0 .77 0 1.75v20.5C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.75V1.75C24 .77 23.21 0 22.23 0zM7.12 20.43H3.56V9.19h3.56v11.24zm-1.78-12.8c-1.14 0-2.07-.92-2.07-2.07 0-1.14.93-2.07 2.07-2.07s2.07.93 2.07 2.07-.93 2.07-2.07 2.07zm15.34 12.8h-3.56v-5.68c0-1.36-.02-3.12-1.9-3.12-1.9 0-2.19 1.49-2.19 3.02v5.78h-3.55V9.19h3.41v1.53h.05c.47-.9 1.6-1.84 3.3-1.84 3.53 0 4.18 2.32 4.18 5.34v6.21z" />
        </svg>
      </a>

      <!-- YouTube Icon -->
      <a href="https://youtube.com" target="_blank" aria-label="YouTube" class="hover:text-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
          <path d="M23.498 6.186a2.866 2.866 0 0 0-2.01-2.016C19.722 3.75 12 3.75 12 3.75s-7.722 0-9.488.42a2.868 2.868 0 0 0-2.01 2.016c-.444 1.754-.444 5.42-.444 5.42s0 3.666.444 5.42a2.866 2.866 0 0 0 2.01 2.016c1.766.42 9.488.42 9.488.42s7.722 0 9.488-.42a2.868 2.868 0 0 0 2.01-2.016c.444-1.754.444-5.42.444-5.42s0-3.666-.444-5.42zM9.75 15.568V8.932l5.776 3.318-5.776 3.318z" />
        </svg>
      </a>
    </div>

    <!-- Bottom Copyright Section -->
    <div class="mt-4 text-center">
      &copy; Alphadroid India private limited. All rights reserved.
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
footer {
  background-color: #111;
  color: white;
  font-size: 14px;
}
a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
