const ReadAndCompress = (e) => {
    const size = `Before Compression: ${(e.target.files[0].size/(1000*1024)).toFixed(2)} MB`;
    document.querySelector("p[name=before-compression]").innerHTML = size;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
  
    reader.onload = event => {
      const img = document.querySelector("img.before");
      img.src = event.target.result;
      //img.style = "display: true";
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const elem = document.querySelector('canvas');
        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const webp = ctx.canvas.toDataURL("image/webp", 0.5);
        const imgAfter = document.querySelector("img.after");
        imgAfter.src = webp;
        imgAfter.style = "display:true";
        const head = 'data:image/webp;base64,';
        const imgFileSize = (Math.round((webp.length - head.length)*3/4) / (1000)).toFixed(2);
        document.querySelector("p[name=after-compression]").innerHTML =
          `After Compression: ${imgFileSize} KB`;
      },
      reader.onerror = error => console.error(error);
    }
  }
  
  document.querySelector("input[name=upload-image]")
  .addEventListener("change", (event) => ReadAndCompress(event))