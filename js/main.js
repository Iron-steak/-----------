<<<<<<< HEAD
/**
 * Netflix Clone - Main JavaScript File
 * Handles all interactive functionality across the application
 */
=======
// Čekáme, až se načte celý HTML dokument
document.addEventListener("DOMContentLoaded", () => {
>>>>>>> 7e1488d9108b5931253b4cf410be879766a670fa

// Application state and configuration
const APP_CONFIG = {
  API_BASE_URL: "https://api.tvmaze.com",
  SCROLL_THRESHOLD: 100,
  DEFAULT_POSTER: "https://via.placeholder.com/210x295.png?text=No+Image",
}

// Utility functions for DOM manipulation and state management
const DOMUtils = {
  /**
   * Add CSS class to element
   */
  addClass: (element, className) => {
    if (element) element.classList.add(className)
  },

  /**
   * Remove CSS class from element
   */
  removeClass: (element, className) => {
    if (element) element.classList.remove(className)
  },

  /**
   * Toggle CSS class on element
   */
  toggleClass: (element, className) => {
    if (element) element.classList.toggle(className)
  },

  /**
   * Check if element has CSS class
   */
  hasClass: (element, className) => {
    return element ? element.classList.contains(className) : false
  },
}

// Validation utilities
const ValidationUtils = {
  /**
   * Validate email format
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * Check if passwords match and meet requirements
   */
  validatePasswords: (password, confirmPassword) => {
    const result = {
      isValid: false,
      message: "",
      type: "error",
    }

    if (!password || !confirmPassword) {
      result.message = "Vyplňte obě hesla"
      return result
    }

    if (password.length < 6) {
      result.message = "Heslo musí mít alespoň 6 znaků"
      return result
    }

    if (password !== confirmPassword) {
      result.message = "Hesla se neshodují"
      return result
    }

    result.isValid = true
    result.message = "Hesla se shodují"
    result.type = "success"
    return result
  },
}

// Main application class
class NetflixClone {
  constructor() {
    this.currentPage = this.detectCurrentPage()
    this.init()
  }

  /**
   * Detect which page we're currently on based on URL or page elements
   */
  detectCurrentPage() {
    const path = window.location.pathname
    if (path.includes("register.html")) return "register"
    if (path.includes("movies.html")) return "movies"
    return "home"
  }

  /**
   * Initialize the application based on current page
   */
  init() {
    this.initCommonFeatures()

    switch (this.currentPage) {
      case "home":
        this.initHomePage()
        break
      case "register":
        this.initRegisterPage()
        break
      case "movies":
        this.initMoviesPage()
        break
    }
  }

  /**
   * Initialize features common to all pages
   */
  initCommonFeatures() {
    this.initScrollToTop()
  }

  /**
   * Initialize scroll-to-top functionality
   */
  initScrollToTop() {
    const scrollBtn = document.getElementById("scroll-to-top")
    if (!scrollBtn) return

    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      const shouldShow = window.pageYOffset > APP_CONFIG.SCROLL_THRESHOLD

      if (shouldShow) {
        DOMUtils.addClass(scrollBtn, "visible")
      } else {
        DOMUtils.removeClass(scrollBtn, "visible")
      }
    })

    // Handle click event
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

<<<<<<< HEAD
  /**
   * Initialize home page functionality
   */
  initHomePage() {
    const emailForm = document.getElementById("email-form")
    if (!emailForm) return

    emailForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const emailInput = document.getElementById("email-input")
      const email = emailInput.value.trim()

      if (!ValidationUtils.isValidEmail(email)) {
        DOMUtils.addClass(emailInput, "error-state")
        alert("Zadejte platnou e-mailovou adresu")
        return
=======
  // --- Logika pro (index.html) ---
  const emailForm = document.getElementById("email-form")
  if (emailForm) {
    emailForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("email-input").value
      if (email) {
        window.location.href = `register.html?email=${encodeURIComponent(email)}`
>>>>>>> 7e1488d9108b5931253b4cf410be879766a670fa
      }

      DOMUtils.removeClass(emailInput, "error-state")
      window.location.href = `register.html?email=${encodeURIComponent(email)}`
    })
  }

<<<<<<< HEAD
  /**
   * Initialize registration page functionality
   */
  initRegisterPage() {
    this.prefillEmailFromURL()
    this.initPasswordValidation()
    this.initRegistrationForm()
  }
=======
  // --- Logika pro (register.html) ---
  const registerForm = document.getElementById("register-form")
  if (registerForm) {
    const params = new URLSearchParams(window.location.search)
    const emailFromUrl = params.get("email")
    if (emailFromUrl) {
      document.getElementById("register-email").value = emailFromUrl
    }
>>>>>>> 7e1488d9108b5931253b4cf410be879766a670fa

  /**
   * Pre-fill email from URL parameter
   */
  prefillEmailFromURL() {
    const urlParams = new URLSearchParams(window.location.search)
    const email = urlParams.get("email")
    const emailInput = document.getElementById("register-email")

    if (email && emailInput) {
      emailInput.value = email
    }
  }

  /**
   * Initialize real-time password validation
   */
  initPasswordValidation() {
    const passwordInput = document.getElementById("password")
    const confirmPasswordInput = document.getElementById("confirm-password")

    if (!passwordInput || !confirmPasswordInput) return

    // Create validation message element
    const validationMessage = document.createElement("div")
    validationMessage.className = "password-validation-message"
    confirmPasswordInput.parentNode.insertBefore(validationMessage, confirmPasswordInput.nextSibling)

    // Validation function
    const validatePasswords = () => {
      const password = passwordInput.value
      const confirmPassword = confirmPasswordInput.value
      const validation = ValidationUtils.validatePasswords(password, confirmPassword)

      // Update input states
      this.updateInputValidationState(passwordInput, validation.isValid)
      this.updateInputValidationState(confirmPasswordInput, validation.isValid)

      // Update validation message
      this.updateValidationMessage(validationMessage, validation)
    }

    // Add event listeners for real-time validation
    passwordInput.addEventListener("input", validatePasswords)
    confirmPasswordInput.addEventListener("input", validatePasswords)
  }

  /**
   * Update input field validation state
   */
  updateInputValidationState(input, isValid) {
    if (!input.value) {
      DOMUtils.removeClass(input, "error-state")
      DOMUtils.removeClass(input, "success-state")
      return
    }

    if (isValid) {
      DOMUtils.removeClass(input, "error-state")
      DOMUtils.addClass(input, "success-state")
    } else {
      DOMUtils.removeClass(input, "success-state")
      DOMUtils.addClass(input, "error-state")
    }
  }

  /**
   * Update validation message display
   */
  updateValidationMessage(messageElement, validation) {
    if (!validation.message) {
      DOMUtils.removeClass(messageElement, "visible")
      return
    }

    messageElement.textContent = validation.message
    DOMUtils.removeClass(messageElement, "error")
    DOMUtils.removeClass(messageElement, "success")
    DOMUtils.addClass(messageElement, validation.type)
    DOMUtils.addClass(messageElement, "visible")
  }

  /**
   * Initialize registration form submission
   */
  initRegistrationForm() {
    const registerForm = document.getElementById("register-form")
    if (!registerForm) return

    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()
<<<<<<< HEAD

      const formData = this.getFormData(registerForm)
      const validation = ValidationUtils.validatePasswords(formData.password, formData.confirmPassword)

      if (!validation.isValid) {
        alert(validation.message)
        return
=======
      if (passwordInput.value !== confirmPasswordInput.value) {
        alert("Hesla se neshodují!")
        confirmPasswordInput.classList.add("invalid")
      } else {
        confirmPasswordInput.classList.remove("invalid")
        alert("Registrace úspěšná!")
        console.log("Formulář odeslán.")
>>>>>>> 7e1488d9108b5931253b4cf410be879766a670fa
      }

      // Simulate successful registration
      console.log("Registration data:", formData)
      alert("Registrace byla úspěšná!")
    })
  }

<<<<<<< HEAD
  /**
   * Extract form data into object
   */
  getFormData(form) {
    const formData = new FormData(form)
    const data = {}

    for (const [key, value] of formData.entries()) {
      data[key] = value
    }

    return data
  }

  /**
   * Initialize movies page functionality
   */
  initMoviesPage() {
    this.moviesAPI = new MoviesAPI()
    this.initCategorySelector()
    this.loadInitialMovies()
  }

  /**
   * Initialize category selector functionality
   */
  initCategorySelector() {
=======
  // --- Logika pro (movies.html) ---
  const moviesGrid = document.getElementById("shows-grid")
  if (moviesGrid) {
>>>>>>> 7e1488d9108b5931253b4cf410be879766a670fa
    const categorySelect = document.getElementById("category-select")
    if (!categorySelect) return

<<<<<<< HEAD
    categorySelect.addEventListener("change", (e) => {
      const selectedCategory = e.target.value
      this.loadMoviesByCategory(selectedCategory)
    })
  }
=======
    // Funkce pro načtení filmů z API
    const fetchMovies = async (category) => {
      loading.style.display = "block"
      noResults.style.display = "none"
      moviesGrid.innerHTML = ""
>>>>>>> 7e1488d9108b5931253b4cf410be879766a670fa

  /**
   * Load initial movies on page load
   */
  loadInitialMovies() {
    const categorySelect = document.getElementById("category-select")
    const initialCategory = categorySelect ? categorySelect.value : "Girl"
    this.loadMoviesByCategory(initialCategory)
  }

  /**
   * Load movies by category with proper state management
   */
  async loadMoviesByCategory(category) {
    const loadingElement = document.getElementById("loading")
    const noResultsElement = document.getElementById("no-results")
    const gridElement = document.getElementById("shows-grid")

    // Show loading state
    DOMUtils.addClass(loadingElement, "visible")
    DOMUtils.removeClass(noResultsElement, "visible")

    if (gridElement) {
      gridElement.innerHTML = ""
    }

    try {
      const movieResults = await this.moviesAPI.searchMovies(category)

      if (movieResults.length === 0) {
        DOMUtils.addClass(noResultsElement, "visible")
      } else {
        this.renderMovies(movieResults)
      }
    } catch (error) {
      console.error("Error loading movies:", error)
      this.showErrorMessage("Nepodařilo se načíst filmy. Zkuste to prosím později.")
    } finally {
      DOMUtils.removeClass(loadingElement, "visible")
    }
  }

  /**
   * Render movies in the grid
   */
  renderMovies(movieResults) {
    const gridElement = document.getElementById("shows-grid")
    if (!gridElement) return

    const movieElements = movieResults.map((movieData) => this.createMovieElement(movieData.show))

    // Add fade-in animation
    movieElements.forEach((element, index) => {
      setTimeout(() => {
        DOMUtils.addClass(element, "fade-in")
        gridElement.appendChild(element)
      }, index * 50) // Stagger the animations
    })
  }

  /**
   * Create individual movie element
   */
  createMovieElement(movie) {
    const movieElement = document.createElement("div")
    movieElement.className = "show-card"

    const posterUrl = movie.image?.medium || APP_CONFIG.DEFAULT_POSTER

    movieElement.innerHTML = `
      <img src="${posterUrl}" 
           alt="${movie.name}" 
           onerror="this.onerror=null;this.src='${APP_CONFIG.DEFAULT_POSTER}';">
    `

    // Add click handler for future movie details functionality
    movieElement.addEventListener("click", () => {
      console.log("Movie clicked:", movie.name)
      // Future: Open movie details modal or navigate to details page
    })
<<<<<<< HEAD

    return movieElement
=======
    fetchMovies(categorySelect.value)
>>>>>>> 7e1488d9108b5931253b4cf410be879766a670fa
  }

  /**
   * Show error message to user
   */
  showErrorMessage(message) {
    const noResultsElement = document.getElementById("no-results")
    if (noResultsElement) {
      noResultsElement.innerHTML = `<p>${message}</p>`
      DOMUtils.addClass(noResultsElement, "visible")
    }
  }
}

/**
 * Movies API handler class
 */
class MoviesAPI {
  constructor() {
    this.baseURL = APP_CONFIG.API_BASE_URL
  }

  /**
   * Search for movies by query
   */
  async searchMovies(query) {
    const response = await fetch(`${this.baseURL}/search/shows?q=${encodeURIComponent(query)}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  }
}

// Initialize the application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new NetflixClone()
})
