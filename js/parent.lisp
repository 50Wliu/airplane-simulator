(defun build-html (descriptor)
  (destructuring-bind (tagname attributes children) descriptor
    (let ((element (funcall (@ document create-element) tagname)))
      (loop for (attr value) of attributes
	 do (case attr
	      (:id
	       (setf (@ element id) value))
	      (:class
	       (if (@ element class-list)
		   (progn
		     (unless (objectp value)
		       (setf value (funcall (@ value split) " ")))
		     (loop for classes in value
			do (funcall (@ element class-list add) classes)))
		   (setf (@ element class-name) value)))
	      (:style
	       (loop for (descriptors values) of value
		  do (setf (getprop (@ element style) descriptors)
			   (if (stringp values)
			       values
			       (concatenate 'string (*string values) "px")))))
	      (t
	       (funcall (@ element set-attribute) attr value))))
      (if children
	  (loop for child in children
	     for parsed-child = (if (stringp child)
				    (funcall (@ document create-text-node) child)
				    (build-html child))
	     do (funcall (@ element append-child) parsed-child)))
      element)))
