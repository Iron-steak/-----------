// Čekáme, až se načte celý HTML dokument
document.addEventListener("DOMContentLoaded", () => {
  // --- Společné funkce pro všechny stránky ---

  const scrollToTopBtn = document.getElementById("scroll-to-top")

  // Zobrazit/skrýt tlačítko pro návrat nahoru
  window.onscroll = () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      scrollToTopBtn.style.display = "block"
    } else {
      scrollToTopBtn.style.display = "none"
    }
  }

  // Funkce pro kliknutí na tlačítko
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

  // --- Logika pro hlavní stránku (index.html) ---
  const emailForm = document.getElementById("email-form")
  if (emailForm) {
    emailForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("email-input").value
      if (email) {
        // Přesměrujeme na registraci s předvyplněným emailem
        window.location.href = `register.html?email=${encodeURIComponent(email)}`
      }
    })
  }

  // --- Logika pro registrační stránku (register.html) ---
  const registerForm = document.getElementById("register-form")
  if (registerForm) {
    // Zkusíme získat email z URL a předvyplnit ho
    const params = new URLSearchParams(window.location.search)
    const emailFromUrl = params.get("email")
    if (emailFromUrl) {
      document.getElementById("register-email").value = emailFromUrl
    }

    const passwordInput = document.getElementById("password")
    const confirmPasswordInput = document.getElementById("confirm-password")

    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()
      if (passwordInput.value !== confirmPasswordInput.value) {
        alert("Hesla se neshodují!")
        confirmPasswordInput.classList.add("invalid")
      } else {
        confirmPasswordInput.classList.remove("invalid")
        alert("Registrace úspěšná!")
        // Tady by se data odeslala na server
        console.log("Formulář odeslán.")
      }
    })
  }

  // --- Logika pro stránku s filmy (movies.html) ---
  const moviesGrid = document.getElementById("shows-grid")
  if (moviesGrid) {
    const categorySelect = document.getElementById("category-select")
    const loading = document.getElementById("loading")
    const noResults = document.getElementById("no-results")

    // Funkce pro načtení filmů z API
    const fetchMovies = async (category) => {
      loading.style.display = "block"
      noResults.style.display = "none"
      moviesGrid.innerHTML = "" // Vyčistíme staré výsledky

      try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${category}`)
        const movies = await response.json()

        if (movies.length === 0) {
          noResults.style.display = "block"
        } else {
          displayMovies(movies)
        }
      } catch (error) {
        console.error("Chyba při načítání dat:", error)
        noResults.textContent = "Nepodařilo se načíst data. Zkuste to prosím později."
        noResults.style.display = "block"
      } finally {
        loading.style.display = "none"
      }
    }

    // Funkce pro zobrazení filmů na stránce
    const displayMovies = (movies) => {
      movies.forEach((movieData) => {
        const movie = movieData.show
        const poster = movie.image ? movie.image.medium : "https://via.placeholder.com/210x295.png?text=No+Image"

        const movieElement = document.createElement("div")
        movieElement.classList.add("show-card")

        movieElement.innerHTML = `<img src="${poster}" alt="${movie.name}" onerror="this.onerror=null;this.src='https://via.placeholder.com/210x295.png?text=No+Image';">`

        moviesGrid.appendChild(movieElement)
      })
    }

    // Načteme filmy při změně kategorie
    categorySelect.addEventListener("change", () => {
      fetchMovies(categorySelect.value)
    })

    // Prvotní načtení filmů
    fetchMovies(categorySelect.value)
  }
})
