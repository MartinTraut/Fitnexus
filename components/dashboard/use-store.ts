'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { initializeStore, subscribeStore, getStoreVersion, getServerStoreVersion } from '@/lib/store'

/**
 * Liest den localStorage-Store, ohne ihn in lokalen State zu kopieren.
 *
 * useSyncExternalStore rendert beim Hydrieren zuerst den Server-Schnappschuss
 * (-1 = "noch nichts gelesen") und danach den echten — deshalb gibt es weder
 * eine Hydrations-Abweichung noch ein setState im Effekt.
 *
 * `ready` sagt, ob echte Daten vorliegen. Solange es false ist, zeigen die
 * Ansichten einen Strich statt einer 0: eine 0 waere eine Aussage
 * ("du hast keine Kunden"), die zu dem Zeitpunkt niemand kennt.
 */
export function useStoreData<T>(read: () => T): { data: T | null; ready: boolean } {
  useEffect(() => {
    initializeStore()
  }, [])

  // Der Abruf haengt an der Version: jede Mutation erhoeht sie, das
  // Abonnement loest ein Rendern aus und hier wird neu gelesen. Bewusst
  // ohne useMemo — der Speicherzugriff ist billig, und ein Memo muesste
  // ohnehin auf `version` hoeren, was der Linter als ueberfluessig liest.
  const version = useSyncExternalStore(subscribeStore, getStoreVersion, getServerStoreVersion)
  const ready = version >= 0

  return { data: ready ? read() : null, ready }
}
