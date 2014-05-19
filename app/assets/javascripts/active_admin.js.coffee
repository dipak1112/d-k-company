#= require active_admin/base
#= require tinymce
$(document).ready ->
  tinyMCE.init
    mode: "textareas"
    theme: "modern"
    editor_selector: "tinymce"
    plugins: "hr,link,image,code"
    image_advtab: true
  return