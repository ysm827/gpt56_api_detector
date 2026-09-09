"""Model-list parsing only; the caller owns transport and network permissions."""
from .errors import RequestError
from .utils import strict_json_loads


def parse_models(body, guard):
    value = strict_json_loads(body)
    guard.check(value)
    rows = value.get('data') if isinstance(value, dict) else None
    if not isinstance(rows, list):
        raise RequestError('model_list_unavailable')
    models = []
    seen = set()
    for row in rows:
        identity = row.get('id') if isinstance(row, dict) else None
        if not isinstance(identity, str) or not identity.strip() or len(identity) > 256:
            continue
        if identity not in seen:
            models.append(identity)
            seen.add(identity)
        if len(models) == 2000:
            break
    return {'models': models}
