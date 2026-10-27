"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  X,
  ZoomIn,
  FolderOpen,
} from "lucide-react";

type MediaItem = {
  id: string;
  project_id: string;
  type: "image" | "video";
  url: string;
  title: string | null;
  display_order: number | null;
  signedUrl: string | null;
};

type ProjectGalleryProps = {
  media: MediaItem[];
  projectTitle: string;
};

export function ProjectGallery({
  media,
  projectTitle,
}: ProjectGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] =
    useState<number | null>(null);

  const [touchStartX, setTouchStartX] =
    useState<number | null>(null);

  // Gunakan media pertama yang berhasil memperoleh signed URL
  // sebagai hero, sama seperti perilaku sebelumnya.
  const heroMediaIndex = media.findIndex(
    (item) => item.signedUrl !== null
  );

  const heroMedia =
    heroMediaIndex >= 0
      ? media[heroMediaIndex]
      : null;

  const galleryMedia = media.filter(
    (_, index) => index !== heroMediaIndex
  );

  // Lightbox hanya untuk gambar yang memiliki signed URL.
  // Video tetap menggunakan player bawaan browser.
  const lightboxImages = media.filter(
    (item) =>
      item.type === "image" &&
      item.signedUrl !== null
  );

  const activeImage =
    activeImageIndex !== null
      ? lightboxImages[activeImageIndex]
      : null;

  const closeLightbox = useCallback(() => {
    setActiveImageIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveImageIndex((current) => {
      if (current === null || lightboxImages.length === 0) {
        return current;
      }

      return (
        current - 1 + lightboxImages.length
      ) % lightboxImages.length;
    });
  }, [lightboxImages.length]);

  const showNext = useCallback(() => {
    setActiveImageIndex((current) => {
      if (current === null || lightboxImages.length === 0) {
        return current;
      }

      return (current + 1) % lightboxImages.length;
    });
  }, [lightboxImages.length]);

  // Keyboard navigation dan scroll lock.
  useEffect(() => {
    if (activeImageIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    activeImageIndex,
    closeLightbox,
    showPrevious,
    showNext,
  ]);

  function handleTouchStart(
    event: React.TouchEvent<HTMLDivElement>
  ) {
    setTouchStartX(event.touches[0].clientX);
  }

  function handleTouchEnd(
    event: React.TouchEvent<HTMLDivElement>
  ) {
    if (touchStartX === null) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const difference = touchEndX - touchStartX;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        showPrevious();
      } else {
        showNext();
      }
    }

    setTouchStartX(null);
  }

  function openImage(imageId: string) {
    const index = lightboxImages.findIndex(
      (item) => item.id === imageId
    );

    if (index >= 0) {
      setActiveImageIndex(index);
    }
  }

  function renderImage(
    item: MediaItem,
    alt: string,
    priority = false
  ) {
    if (!item.signedUrl) {
      return (
        <div className="flex min-h-[220px] items-center justify-center p-8 text-center text-sm text-red-400">
          Media gagal dimuat. Periksa file di Storage.
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={() => openImage(item.id)}
        aria-label={`Perbesar gambar: ${alt}`}
        className="group/image relative block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff5a1f]"
      >
        <img
          src={item.signedUrl}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="h-auto max-h-[900px] w-full object-contain"
        />

        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover/image:bg-black/20">
          <span className="flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-xl transition-all duration-300 group-hover/image:translate-y-0 group-hover/image:opacity-100">
            <ZoomIn className="h-5 w-5" />
          </span>
        </span>
      </button>
    );
  }

  function renderVideo(item: MediaItem) {
    if (!item.signedUrl) {
      return (
        <div className="p-8 text-center text-sm text-red-400">
          Video gagal dimuat. Periksa file di Storage.
        </div>
      );
    }

    return (
      <video
        src={item.signedUrl}
        controls
        preload="metadata"
        playsInline
        className="h-auto max-h-[850px] w-full"
      >
        Browser kamu tidak mendukung pemutaran video.
      </video>
    );
  }

  return (
    <>
      {/* Hero media */}

      <section aria-label="Project hero media">
        {heroMedia ? (
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03] sm:rounded-3xl">
            {heroMedia.type === "image" ? (
              renderImage(
                heroMedia,
                heroMedia.title || projectTitle,
                true
              )
            ) : (
              renderVideo(heroMedia)
            )}
          </div>
        ) : (
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-black/15 px-6 text-center dark:border-white/15 sm:min-h-[400px] sm:rounded-3xl">
            <FolderOpen className="mb-4 h-10 w-10 text-black/30 dark:text-white/30" />

            <p className="text-sm text-black/50 dark:text-white/50">
              Belum ada media yang tersedia untuk project ini.
            </p>
          </div>
        )}
      </section>

      {/* Gallery */}

      {galleryMedia.length > 0 && (
        <section className="mt-20 md:mt-28">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#ff5a1f]">
                Behind the Work
              </p>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">
                Project Gallery
              </h2>
            </div>

            <p className="text-xs text-black/40 dark:text-white/40">
              {galleryMedia.length}{" "}
              {galleryMedia.length === 1 ? "item" : "items"}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {galleryMedia.map((item, index) => (
              <div
                key={item.id}
                className={`overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03] ${
                  index % 3 === 0 ? "md:col-span-2" : ""
                }`}
              >
                {item.type === "image" ? (
                  renderImage(
                    item,
                    item.title ||
                      `${projectTitle} gallery image ${index + 1}`
                  )
                ) : (
                  renderVideo(item)
                )}

                {item.title && (
                  <div className="border-t border-black/10 px-5 py-4 dark:border-white/10">
                    <p className="text-sm text-black/60 dark:text-white/60">
                      {item.title}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Fullscreen lightbox */}

      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image viewer"
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 text-white backdrop-blur-xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Toolbar */}

          <div className="relative z-10 flex min-h-16 items-center justify-between gap-4 border-b border-white/10 px-4 sm:px-6">
            <p className="min-w-0 truncate text-xs text-white/60 sm:text-sm">
              {activeImage.title || projectTitle}
            </p>

            <div className="flex shrink-0 items-center gap-4">
              <span className="text-xs tabular-nums text-white/50">
                {activeImageIndex! + 1} / {lightboxImages.length}
              </span>

              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Tutup lightbox"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Image stage */}

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 py-4 sm:px-16 sm:py-8">
            {lightboxImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Gambar sebelumnya"
                  className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f] sm:left-5 sm:h-12 sm:w-12"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Gambar berikutnya"
                  className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a1f] sm:right-5 sm:h-12 sm:w-12"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </>
            )}

            <img
              key={activeImage.id}
              src={activeImage.signedUrl!}
              alt={activeImage.title || projectTitle}
              draggable={false}
              className="max-h-full max-w-full select-none object-contain"
            />
          </div>

          {/* Caption */}

          <div className="flex min-h-12 items-center justify-center border-t border-white/10 px-4 py-3 text-center">
            <p className="max-w-3xl text-xs text-white/50 sm:text-sm">
              {activeImage.title || projectTitle}
            </p>
          </div>
        </div>
      )}
    </>
  );
}