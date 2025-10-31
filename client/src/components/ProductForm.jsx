// src/components/ProductForm.jsx
import { useEffect, useMemo, useRef, useState } from 'react';

const SECTIONS = {
  materialesMedidas: {
    title: 'Materiales y Medidas',
    fields: ['medidas','materiales','acabado','peso'],
  },
  usoCapacidad: {
    title: 'Uso y Capacidad',
    fields: ['capacidad','cargaMaxima','apilables','modulares','extension','almacenamiento'],
  },
  confortTapizado: {
    title: 'Confort y Tapizado',
    fields: ['tapizado','confort','relleno','colchon','estructura'],
  },
  mecanismos: {
    title: 'Mecanismos',
    fields: ['rotacion','regulacion','cables'],
  },
  sustentabilidad: {
    title: 'Sustentabilidad',
    fields: ['sostenibilidad','certificacion'],
  },
  extras: {
    title: 'Extras',
    fields: ['incluye','caracteristicas','garantia'],
  },
};

const INITIAL_FORM = {
  // Básicos
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  imagenUrl: '',

  // Opcionales
  medidas: '', materiales: '', acabado: '', peso: '',
  capacidad: '', modulares: '', tapizado: '', confort: '',
  rotacion: '', garantia: '', cargaMaxima: '', almacenamiento: '',
  caracteristicas: '', colchon: '', estructura: '', relleno: '',
  sostenibilidad: '', extension: '', apilables: '', incluye: '',
  cables: '', regulacion: '', certificacion: ''
};

export default function ProductForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [validated, setValidated] = useState(false); // indica si se intentó enviar
  const [touched, setTouched] = useState({});        // campos tocados (para feedback más fino)

  // Secciones colapsables
  const [openSections, setOpenSections] = useState(() => ({
    materialesMedidas: false,
    usoCapacidad: false,
    confortTapizado: false,
    mecanismos: false,
    sustentabilidad: false,
    extras: false,
  }));

  // Accesibilidad / foco
  const firstInvalidRef = useRef(null);
  const formRef = useRef(null);

  const requiredFields = useMemo(
    () => ([
      { name: 'nombre', label: 'Nombre del producto' },
      { name: 'precio', label: 'Precio' },
    ]),
    []
  );
  const REQUIRED = useMemo(() => new Set(requiredFields.map(f => f.name)), [requiredFields]);
  const isRequired = (name) => REQUIRED.has(name);

  // Helpers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Validaciones específicas
  const isPrecioValid = () => {
    const raw = String(form.precio).trim();
    if (raw === '') return false;
    const v = Number(raw);
    return Number.isFinite(v) && v >= 0;
  };

  const isRequiredValid = (name) => {
    if (name === 'precio') return isPrecioValid();
    if (name === 'nombre') return form.nombre.trim().length > 0;
    return true;
  };

  const fieldClass = (name, base = 'form-control') => {
    const value = form[name];
    const hasValue = String(value ?? '').trim() !== '';

    if (isRequired(name)) {
      const show = validated || touched[name];
      if (!show) return base;
      return isRequiredValid(name) ? `${base} is-valid` : `${base} is-invalid`;
    } else {
      if (!hasValue) return base;  // opcional vacío → sin borde
      // opcional con valor → marcá válido
      return `${base} is-valid`;
    }
  };

  // Validación global (solo requeridos)
  const validate = () => {
    const errors = [];
    if (!isRequiredValid('nombre')) errors.push('nombre');
    if (!isRequiredValid('precio')) errors.push('precio');

    if (errors.length) {
      setValidated(true);
      // foco al primer error
      setTimeout(() => {
        const el = formRef.current?.querySelector(`#${errors[0]}`);
        if (el) {
          el.focus();
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 0);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      precio: Number(form.precio || 0),
      stock: Number(form.stock || 0),
    };

    onSubmit(payload);
    setValidated(false);
  };

  useEffect(() => {
    if (validated && firstInvalidRef.current) {
      firstInvalidRef.current.focus();
    }
  }, [validated]);

  return (
    <form
      id="product-form"
      ref={formRef}
      // OJO: no usamos 'was-validated' para no pintar todo de verde.
      noValidate
      onSubmit={handleSubmit}
    >
      {/* CTA abrir detalles */}
      <div className="mb-3 d-flex justify-content-end">
      </div>

      {/* DATOS BÁSICOS */}
      <div className="contact-form-wrapper mb-4">
        {/* NOMBRE (requerido) */}
        <div className="form-floating mb-4">
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre del producto"
            className={fieldClass('nombre')}
            required={isRequired('nombre')}
            aria-describedby="error-nombre"
            value={form.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={firstInvalidRef}
          />
          <label htmlFor="nombre">Nombre del producto</label>
          <div className="invalid-feedback" id="error-nombre">
            Por favor ingresá el nombre del producto.
          </div>
        </div>

        {/* DESCRIPCIÓN (opcional) */}
        <div className="form-floating mb-4">
          <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Descripción del producto"
            style={{ height: '120px' }}
            className={fieldClass('descripcion')}
            value={form.descripcion}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="descripcion">Descripción</label>
        </div>

        {/* PRECIO (requerido) & STOCK (opcional) */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="number"
                id="precio"
                name="precio"
                placeholder="Precio"
                min="0"
                step="0.01"
                className={fieldClass('precio')}
                required={isRequired('precio')}
                aria-describedby="error-precio precio-help"
                value={form.precio}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="precio">Precio</label>
              <div className="invalid-feedback" id="error-precio">
                Ingresá un precio válido (número ≥ 0).
              </div>
              <div className="form-text" id="precio-help">
                Ej: 129999.99
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input type="number" id="stock" name="stock" placeholder="Stock" min="0" step="1" className={fieldClass('stock')} aria-describedby="stock-help" value={form.stock}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="stock">Stock disponible</label>
            </div>
          </div>
        </div>

        {/* IMAGEN URL (opcional) */}
        <div className="form-floating mb-2">
          <input
            type="url"
            id="imagenUrl"
            name="imagenUrl"
            placeholder="https://ejemplo.com/imagen.jpg"
            className={fieldClass('imagenUrl')}
            aria-describedby="imagen-help"
            value={form.imagenUrl}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="imagenUrl">URL de la imagen</label>
          <div className="form-text" id="imagen-help">
            Ingresa el enlace de la imagen.
          </div>
        </div>
      </div>

      {/* SECCIONES COLAPSABLES */}
      {Object.entries(SECTIONS).map(([key, cfg]) => (
        <div className="mb-3" key={key}>
          <button
            type="button"
            className="btn btn-secondary w-100 text-start"
            aria-expanded={openSections[key] ? 'true' : 'false'}
            aria-controls={`section-${key}`}
            onClick={() => toggleSection(key)}
            style={{ backgroundColor: 'transparent', color: 'var(--siena-tostado)', border: '1px solid var(--siena-tostado)' }}
          >
            <i className={`bi me-2 ${openSections[key] ? 'bi-chevron-down' : 'bi-chevron-right'}`} aria-hidden="true"></i>
            {cfg.title}
          </button>

          {openSections[key] && (
            <div id={`section-${key}`} className="contact-form-wrapper mt-3" role="region" aria-label={cfg.title}>
              <div className="row g-3">
                {cfg.fields.map((fname) => (
                  <div className="col-md-6" key={fname}>
                    <div className="form-floating">
                      <input
                        type="text"
                        id={fname}
                        name={fname}
                        placeholder={fname}
                        className={fieldClass(fname)}
                        value={form[fname]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-describedby={`${fname}-help`}
                      />
                      <label htmlFor={fname}>{toLabel(fname)}</label>
                      <div className="form-text" id={`${fname}-help`}>
                        {helperText(fname)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* BOTONES */}
      <div className="d-flex gap-2 mt-4">
        <button type="submit" className="btn btn-primary">
          <i className="bi bi-check-circle me-2" aria-hidden="true"></i>
          Crear Producto
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

/* Utils de etiquetas/ayudas */
function toLabel(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (s) => s.toUpperCase());
}

function helperText(name) {
  switch (name) {
    case 'medidas': return 'Ej: 120×60×75 cm';
    case 'cargaMaxima': return 'Ej: 120 kg';
    case 'capacidad': return 'Ej: 300 L';
    case 'rotacion': return 'Ej: 360° / No';
    case 'regulacion': return 'Ej: Altura 45–60 cm / respaldo';
    case 'materiales': return 'Ej: Algarrobo, hierro, MDF laqueado';
    case 'acabado': return 'Ej: Aceitado natural / laca poliuretánica';
    case 'peso': return 'Ej: 12 kg';
    case 'extension': return 'Ej: Extensible a 200 cm';
    case 'apilables': return 'Ej: Sí / No / Máx. 4 unid.';
    case 'incluye': return 'Ej: Tornillería, manual, llaves Allen';
    case 'certificacion': return 'Ej: FSC, ISO 14001';
    default: return '';
  }
}
